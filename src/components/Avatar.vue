<template>
    <div @click.stop="chooseAvatar" class="avatarClass">
        <SvgIcon :name="iconName" class="avatarImages" />
    </div>
</template>

<style scoped>
.avatarClass {
    height: 50px;
    width: 50px;
    
    border: v-bind(border);
    border-radius: 5px;

    user-select: none;
}
</style>

<script>
import SvgIcon from '@/components/SvgIcon.vue';

export default {
    data() {
        return {
            
        }
    },
    computed:{
        border(){
            return this.avatarActive ? '1px solid black' : 'unset';
        }
    },
    props: {
        iconName: String,
        avatarActive: {
            type:Boolean,
            default:false,
            required: true,
        },
    },
    emits:['changeActiveAvatar'],
    components: {
        SvgIcon,
    },
    methods:{
        chooseAvatar(){
            // console.log("lalala");
            // this.avatarActive = !this.avatarActive;
            this.$emit('changeActiveAvatar',this.iconName);
        }
    }
};
</script>
