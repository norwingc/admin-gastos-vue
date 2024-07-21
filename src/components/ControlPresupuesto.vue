<script setup>
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";
import { formatMoney } from "../helpers/index";
import { computed } from "vue";

defineEmits(["reset-app"]);

const props = defineProps({
    presupuesto: {
        type: Number,
        required: true,
    },
    disponible: {
        type: Number,
        required: true,
    },
    gastado: {
        type: Number,
        required: true,
    },
});

const porcentaje = computed(() => {
    return parseInt(
        ((props.presupuesto - props.disponible) / props.presupuesto) * 100
    );
});
</script>

<template>
    <div class="dos-columnas">
        <div class="contenedor-grafico">
            <p class="porcentaje">{{ porcentaje }}%</p>
            <CircleProgress
                :percent="porcentaje"
                :size="250"
                :border-width="20"
                :border-bg-width="20"
                fill-color="#3b82f6"
                empty-color="#f5f5f5"
            />
        </div>
        <div class="contenedor-presupuesto">
            <button class="reset-app" type="button" @click="$emit('reset-app')">
                Resetear Presupuesto
            </button>
            <p><span>Presupuesto:</span> {{ formatMoney(presupuesto) }}</p>
            <p><span>Disponible:</span> {{ formatMoney(disponible) }}</p>
            <p><span>Gastado:</span> {{ formatMoney(gastado) }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dos-columnas {
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
        flex-direction: row;
        gap: 4rem;
        align-content: center;
    }

    & > :first-child {
        margin-bottom: 3rem;
        @media (min-width: 768px) {
            margin-bottom: 0;
        }
    }

    .contenedor-presupuesto {
        width: 100%;
        color: var(--gris-oscuro);
        p {
            font-size: 2.4rem;
            text-align: center;
            @media (min-width: 768px) {
                text-align: left;
            }
            span {
                font-weight: 900;
                color: var(--azul);
            }
        }

        .reset-app {
            background-color: #db2777;
            border: none;
            color: var(--blanco);
            padding: 1rem;
            width: 100%;
            font-weight: 900;
            text-transform: uppercase;
            border-radius: 1rem;
            transition: background-color 0.3s ease;

            &:hover {
                cursor: pointer;
                background-color: #c11d67;
            }
        }
    }

    .contenedor-grafico {
        position: relative;
        .porcentaje {
            position: absolute;
            margin: auto;
            top: calc(50% - 1.5rem);
            left: 0;
            right: 0;
            text-align: center;
            z-index: 100;
            font-size: 3rem;
            font-weight: 900;
            color: var(--gris-oscuro);
        }
    }
}
</style>
