<template>
    <div class="messageRightWrapper">
        <div class="messageRight">
            <div class="myName">{{ chatterName }}</div>
            <div class="mymsg">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.messageRightWrapper {
    display: flex;
    justify-content: flex-end;
}

.myName {
    font-size: 13px;
}

.mymsg {
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
    .myName {
        font-size: 2.15vmin;
    }

    .mymsg {
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
