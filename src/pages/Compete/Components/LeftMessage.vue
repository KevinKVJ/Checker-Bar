<template>
    <div class="messageLeftWrapper">
        <div class="messageLeft">
            <div class="userName">{{ chatterName }}</div>
            <div class="usermsg">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.messageLeftWrapper {
    display: flex;
    justify-content: flex-start;
}

.userName {
    font-size: 13px;
}

.usermsg {
    /* height: 30px; */
    padding: 4px 8px;
    width: 150px;
    background: white;
    border-radius: 10px;
    font-size: 15px;
    letter-spacing: 0.3px;

    word-wrap: break-word;
}

@media (max-width: 800px) {
    .userName {
        font-size: 2.15vmin;
    }

    .usermsg {
        /* height: 30px; */
        padding: 4px 8px;
        width: 150px;
        background: white;
        border-radius: 10px;
        /* font-size: 16px; */
        font-size: 2.5vmin;
        letter-spacing: 0.3px;

        word-wrap: break-word;
    }
}
</style>

<script setup>
defineProps({
    chatterName: {
        type: String,
        required: true,
    },
});
</script>
