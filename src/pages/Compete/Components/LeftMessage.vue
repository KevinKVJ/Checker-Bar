<template>
    <div class="messageLeft" >
        <div class="userName">otherusers</div>
        <div class="usermsg">
            <slot></slot>
        </div>
    </div>
</template>

<style>
.messageLeft {
    left: 0;
    float: left;
}
.usermsg {
    height: 30px;
    width: 150px;
    background: white;
    border-radius: 10px;
    font-size: 17px;
}
</style>

<script>


</script>
