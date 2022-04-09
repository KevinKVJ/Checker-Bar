<template>
    <div class="messageRight" >
        <div class="myName"> me </div>
        <div class="mymsg">
            <slot> </slot>
        </div>
    </div>
</template>

<style scoped>
    .messageRight{
        right:0; 
        float: right;
    }
    
    .mymsg{
        height: 30px;
        width: 150px;
        background: white;
        border-radius: 10px;
        font-size: 17px;
    }
        
</style>


<script setup>
</script>