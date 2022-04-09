<template>
    <div class="imageSection">
        <template v-for="(val, key) in AvatarNames" :key="key" >
            <Avatar :iconName="key" :avatarActive="val" @change-active-avatar="setAvatarActive"></Avatar>
        </template>
    </div>
</template>

<style scoped>
/* .avatarImages {
    width: 50px;
    height: 50px;
    margin-bottom: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
} */

.imageSection {
    display: flex;
    flex-direction: row;
    padding-bottom: 25px;
}
</style>

<script>
import Avatar from './Avatar.vue';
export default {
    data() {
        return {
            AvatarNames: {
                Avatar1: false,
                Avatar2: false,
                Avatar3: false,
                Avatar4: false,
                Avatar5: false,
                Avatar6: false,
            },
            activeAvatar:null
        };
    },
    components: {
        Avatar,
    },
    methods:{
        setAvatarActive(iconName){
            // console.log(iconName);
            for (const key in this.AvatarNames) {
                this.AvatarNames[key] = false;
            }
            this.AvatarNames[iconName] = true;
            this.activeAvatar = iconName;
            this.$emit('selectedAvatar', this.activeAvatar)
        }
    }
};
</script>
