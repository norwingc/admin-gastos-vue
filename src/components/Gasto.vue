<script setup>
import { formatDate, formatMoney } from "../helpers";

import IconoAhorro from "../assets/img/icono_ahorro.svg";
import IconoCasa from "../assets/img/icono_casa.svg";
import IconoComida from "../assets/img/icono_comida.svg";
import IconoGastos from "../assets/img/icono_gastos.svg";
import IconoOcio from "../assets/img/icono_ocio.svg";
import IconoSalud from "../assets/img/icono_salud.svg";
import IconoSuscripciones from "../assets/img/icono_suscripciones.svg";
const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones,
};

const emit = defineEmits(["seleccionar-gasto"]);

const props = defineProps({
    gasto: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div class="sombra gasto">
        <div class="contenido">
            <img
                :src="diccionarioIconos[gasto.categoria]"
                alt="Icono Gasto"
                class="icono"
            />
            <div class="detalles">
                <p class="categoria">{{ gasto.categoria }}</p>
                <p class="nombre" @click="emit('seleccionar-gasto', gasto.id)">
                    {{ gasto.nombre }}
                </p>
                <p class="fecha">
                    Fecha <span>{{ formatDate(gasto.date) }}</span>
                </p>
            </div>
        </div>
        <p class="cantidad">{{ formatMoney(gasto.cantidad) }}</p>
    </div>
</template>

<style lang="scss" scoped>
.gasto {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    .contenido {
        display: flex;
        gap: 2rem;
        align-items: center;
    }
    .icono {
        width: 4rem;
        height: 4rem;
    }
    .detalles {
        p {
            margin: 0 0 1rem 0;
        }
        .categoria {
            color: var(--gris);
            font-size: 1.2rem;
            text-transform: uppercase;
            font-weight: 900;
        }
        .nombre {
            color: var(--gris-oscuro);
            font-size: 2.4rem;
            font-weight: 700;
            cursor: pointer;
        }
        .fecha {
            color: var(--gris-oscuro);
            font-size: 1.2rem;
            font-weight: 900;
            span {
                font-weight: 400;
            }
        }
    }
    .cantidad {
        font-size: 3rem;
        margin: 0;
        font-weight: 900;
    }
}
</style>
