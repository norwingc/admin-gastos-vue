<script setup>
import { computed, ref } from "vue";
import cerrarModal from "../assets/img/cerrar.svg";
import Alerta from "./Alerta.vue";

const emit = defineEmits([
    "mostar-modal",
    "cerrar-modal",
    "update:nombre",
    "update:cantidad",
    "update:categoria",
    "guardar-gasto",
    "eliminar-gasto",
]);

const props = defineProps({
    modal: {
        type: Object,
        required: true,
    },
    disponible: {
        type: Number,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    cantidad: {
        type: [Number, String],
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    id: {
        type: [String, null],
        required: true,
    },
});

const isEditing = computed(() => props.id);

const error = ref("");

const old = props.cantidad;

const agregarGasto = () => {
    const { nombre, cantidad, categoria, disponible, id } = props;
    if ([nombre, cantidad, categoria].includes("")) {
        error.value = "Todos los campos son obligatorios";
        setTimeout(() => {
            error.value = "";
        }, 3000);
        return;
    }

    if (cantidad <= 0) {
        error.value = "La cantidad tiene que ser mayor a 0";
        setTimeout(() => {
            error.value = "";
        }, 3000);
        return;
    }

    if (id) {
        if (cantidad > old + disponible) {
            error.value = "No hay fondos suficientes";
            setTimeout(() => {
                error.value = "";
            }, 3000);
            return;
        }
    } else {
        if (cantidad > disponible) {
            error.value = "No hay fondos suficientes";
            setTimeout(() => {
                error.value = "";
            }, 3000);
            return;
        }
    }

    emit("guardar-gasto");
};
</script>

<template>
    <div class="modal">
        <div class="cerrar-modal">
            <img :src="cerrarModal" alt="" @click="emit('cerrar-modal')" />
        </div>
        <div
            class="contenedor contenedor-formulario"
            :class="[modal.animar ? 'animar' : 'cerrar']"
        >
            <form class="nuevo-gasto" @submit.prevent="agregarGasto">
                <legend>
                    {{ isEditing ? "Editar Gasto" : "Añadir Gasto" }}
                </legend>
                <Alerta v-if="error">{{ error }}</Alerta>
                <div class="campo">
                    <label for="nombre">Nombre Gasto</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Añade el nombre del gasto"
                        :value="nombre"
                        @input="emit('update:nombre', $event.target.value)"
                    />
                </div>
                <div class="campo">
                    <label for="cantidad">Cantidad</label>
                    <input
                        type="number"
                        id="cantidad"
                        placeholder="Añade la cantidad del gasto, ej. 300"
                        :value="cantidad"
                        @input="emit('update:cantidad', +$event.target.value)"
                    />
                </div>
                <div class="campo">
                    <label for="categoria">categoria</label>
                    <select
                        id="categoria"
                        :value="categoria"
                        @input="emit('update:categoria', $event.target.value)"
                    >
                        <option value="">-- Selecione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input
                    type="submit"
                    :value="[isEditing ? 'Guardar Cambios' : 'Añadir Gasto']"
                />
            </form>
            <button
                type="button"
                class="btn-eliminar"
                v-if="isEditing"
                @click="emit('eliminar-gasto', id)"
            >
                Eliminar Gasto
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal {
    position: absolute;
    background-color: rgb(0 0 0 / 0.9);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .contenedor-formulario {
        transition: all 0.3s ease;
        opacity: 0;
        &.animar {
            opacity: 1;
        }
        &.cerrar {
            opacity: 0;
        }
    }

    .cerrar-modal {
        position: absolute;
        right: 3rem;
        top: 3rem;
        img {
            width: 3rem;
            cursor: pointer;
        }
    }
    .nuevo-gasto {
        margin: 10rem auto 0 auto;
        display: grid;
        gap: 2rem;

        legend {
            text-align: center;
            color: var(--blanco);
            font-size: 3rem;
            font-weight: 700;
        }

        .campo {
            display: grid;
            gap: 2rem;
        }
        input,
        select {
            background-color: var(--gris-claro);
            border-radius: 1rem;
            padding: 1rem;
            border: none;
            font-size: 2.2rem;
        }
        input[type="submit"] {
            background-color: var(--azul);
            color: var(--blanco);
            font-weight: 700;
            cursor: pointer;
        }

        label {
            color: var(--blanco);
            font-size: 3rem;
        }
    }

    .btn-eliminar {
        border: none;
        border-radius: 1rem;
        padding: 1rem;
        width: 100%;
        background-color: #ef4444;
        font-weight: 700;
        font-size: 1.2rem;
        color: var(--blanco);
        margin-top: 10rem;
        cursor: pointer;
    }
}
</style>
