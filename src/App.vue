<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { uid } from "uid";
import Presupuesto from "./components/Presupuesto.vue";
import ControlPresupuesto from "./components/ControlPresupuesto.vue";
import Modal from "./components/Modal.vue";
import iconoNuevoGasto from "./assets/img/nuevo-gasto.svg";
import Gasto from "./components/Gasto.vue";
import Filtros from "./components/Filtros.vue";

const modal = reactive({
    mostrar: false,
    animar: false,
});
const presupuesto = ref(0);
const disponible = ref(0);
const gastado = ref(0);
const gasto = reactive({
    nombre: "",
    cantidad: "",
    categoria: "",
    id: null,
    date: Date.now(),
});
const gastos = ref([]);
const filtro = ref("");

onMounted(() => {
    if (localStorage.getItem("presupuesto")) {
        presupuesto.value = Number(localStorage.getItem("presupuesto"));
        disponible.value = Number(localStorage.getItem("presupuesto"));
    }

    if (localStorage.getItem("gastos")) {
        gastos.value = JSON.parse(localStorage.getItem("gastos"));
    }
});

watch(
    gastos,
    () => {
        const totalGastado = gastos.value.reduce(
            (total, gasto) => total + Number(gasto.cantidad),
            0
        );
        gastado.value = totalGastado;
        disponible.value = presupuesto.value - totalGastado;

        localStorage.setItem("gastos", JSON.stringify(gastos.value));
    },
    { deep: true }
);

watch(
    modal,
    () => {
        if (!modal.mostrar) {
            reiniciarStateGasto();
        }
    },
    { deep: true }
);

watch(
    presupuesto,
    () => {
        localStorage.setItem("presupuesto", JSON.stringify(presupuesto.value));
    },
    { deep: true }
);

const gastosFiltrados = computed(() => {
    if (filtro.value) {
        return gastos.value.filter((gasto) => gasto.categoria === filtro.value);
    }
    return gastos.value;
});

const definirPresupuesto = (cantidad) => {
    presupuesto.value = cantidad;
    disponible.value = cantidad;
};
const mostrarModal = () => {
    modal.mostrar = true;
    setTimeout(() => {
        modal.animar = true;
    }, 300);
};
const cerrarModal = () => {
    setTimeout(() => {
        modal.mostrar = false;
    }, 300);
    modal.animar = false;
};

const reiniciarStateGasto = () => {
    Object.assign(gasto, {
        nombre: "",
        cantidad: "",
        categoria: "",
        id: null,
        date: Date.now(),
    });
};

const guardarGasto = () => {
    if (gasto.id) {
        const { id } = gasto;
        const index = gastos.value.findIndex((gasto) => gasto.id === id);
        gastos.value[index] = { ...gasto };
    } else {
        gastos.value.push({
            ...gasto,
            id: uid(),
        });
    }

    cerrarModal();
};

const seleccionarGasto = (id) => {
    const gastoEditar = gastos.value.filter((gasto) => gasto.id === id)[0];
    Object.assign(gasto, gastoEditar);
    mostrarModal();
};

const elimiarGasto = (id) => {
    if (confirm("¿Deseas eliminar este gasto?")) {
        gastos.value = gastos.value.filter((gasto) => gasto.id !== id);
        cerrarModal();
    }
};

const resetApp = () => {
    if (confirm("¿Deseas reiniciar la app?")) {
        gastos.value = [];
        presupuesto.value = 0;
    }
};
</script>

<template>
    <div :class="{ fijar: modal.mostrar }">
        <header>
            <h1>Planificador de gastos</h1>
            <div class="contendedor-header contenedor sombra">
                <Presupuesto
                    @definir-presupuesto="definirPresupuesto"
                    v-if="presupuesto == 0"
                />
                <ControlPresupuesto
                    v-else
                    :presupuesto="presupuesto"
                    :disponible="disponible"
                    :gastado="gastado"
                    @reset-app="resetApp"
                />
            </div>
        </header>
        <main v-if="presupuesto > 0">
            <Filtros v-model:filtro="filtro" />

            <div class="listado-gastos contenedor">
                <h2>
                    {{
                        gastosFiltrados.length > 0
                            ? "Listado de gastos"
                            : "No hay gastos aún"
                    }}
                </h2>

                <Gasto
                    v-for="gasto in gastosFiltrados"
                    :key="gasto.id"
                    :gasto="gasto"
                    @seleccionar-gasto="seleccionarGasto"
                />
            </div>

            <div class="crear-gasto">
                <img
                    :src="iconoNuevoGasto"
                    alt="icono nuevo gasto"
                    @click="mostrarModal"
                />
            </div>
            <Modal
                v-if="modal.mostrar"
                @cerrar-modal="cerrarModal"
                @guardar-gasto="guardarGasto"
                @eliminar-gasto="elimiarGasto"
                :modal="modal"
                :id="gasto.id"
                :disponible="disponible"
                v-model:nombre="gasto.nombre"
                v-model:cantidad="gasto.cantidad"
                v-model:categoria="gasto.categoria"
            />
        </main>
    </div>
</template>

<style lang="scss">
:root {
    --azul: #3b82f6;
    --blanco: #fff;
    --gris: #94a3b8;
    --gris-claro: #f5f5f5;
    --gris-oscuro: #64748b;
}

html {
    font-size: 62.5%;
    box-sizing: border-box;
}

*,
*:before,
*:after {
    box-sizing: inherit;
}
body {
    font-size: 1.6rem;
    font-family: "lato", sans-serif;
    background-color: var(--gris-claro);
}

h1 {
    font-size: 4rem;
}
h2 {
    font-size: 3rem;
}
header {
    background-color: var(--azul);
    h1 {
        padding: 3rem 0;
        margin: 0;
        color: var(--blanco);
        text-align: center;
    }
}
.contenedor {
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
}
.contendedor-header {
    margin-top: -5rem;
    transform: translateY(5rem);
    padding: 5rem;
}

.sombra {
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    background-color: var(--blanco);
    border-radius: 1.2em;
    padding: 5rem;
}

.crear-gasto {
    position: fixed;
    bottom: 5rem;
    right: 5rem;
    img {
        width: 5rem;
        &:hover {
            cursor: pointer;
        }
    }
}

.listado-gastos {
    margin-top: 10rem;
    h2 {
        font-weight: var(--gris-oscuro);
    }
}

.fijar {
    overflow: hidden;
    height: 100vh;
}
</style>
