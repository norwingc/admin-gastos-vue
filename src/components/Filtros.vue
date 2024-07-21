<script setup>
const props = defineProps({
    filtro: {
        type: String,
        required: true,
    },
});
defineEmits(["update:filtro"]);
</script>

<template>
    <div class="filtros sombra contenedor">
        <form>
            <div class="campo">
                <label for="filtro">Filtrar Gastos</label>
                <select
                    id="filtro"
                    :value="filtro"
                    @input="$emit('update:filtro', $event.target.value)"
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
        </form>
    </div>
</template>

<style lang="scss" scoped>
.filtros {
    margin-top: 10rem;
    .campo {
        display: flex;
        align-items: center;
        gap: 2rem;
        label {
            font-size: 3rem;
            font-weight: 900;
            color: var(--gris-oscuro);
        }
        select {
            flex: 1;
            border: none;
            padding: 1rem;
            border-radius: 1rem;
            background-color: var(--gris-claro);
            text-align: center;
        }
    }
}
</style>
