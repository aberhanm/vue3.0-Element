<template>
  <div class="login-wrap">
    <div class="switch-tabs">
      <ul>
        <li
          v-for="(item,i) in tabs"
          :key="i"
          :class="{'active':item.active}"
          @click="toggleTab(item)"
        >{{item.txt}}</li>
      </ul>
    </div>
    <loginForm :current='current'></loginForm>
  </div>
</template>

<script>
import loginForm from "@/views/login/loginForm";
export default {
  name: "Login",
  components: { loginForm },
  data() {
    return {
      tabs: [
        {
          txt: "登录",
          active: true
        },
        {
          txt: "注册",
          active: false
        }
      ],
      current: '登录'
    };
  },
  methods: {
    toggleTab(data) {
      this.tabs.forEach(ele => {
        ele.active = false;
      });
      data.active = true;
      this.current = data.txt;
    }
  }
};
</script>

<style lang="less" scoped>
.login-wrap {
  margin: 0 auto;
  padding-top: 10vh;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.switch-tabs {
  width: 320px;
  background: rgba(24,144,255, 0.3);
  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  li {
    display: inline-block;
    text-align: center;
    line-height: 32px;
    color: #fff;
    border-radius: 2px;
    width: 50%;
    cursor: pointer;
  }
  .active {
    background: rgba(24,144,255);
  }
}
</style>

