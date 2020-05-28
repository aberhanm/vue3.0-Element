<template>
  <div class="form">
    <a-form :layout="formLayout" :form="form" @submit="handleSubmit">
      <a-form-item label="邮箱" has-feedback>
        <a-input
          size="large"
          placeholder="请输入邮箱"
          v-decorator="['email',{rules:[{type:'email',message:'邮箱格式不正确'},{required:true,message:'请输入邮箱'}]}]"
        />
      </a-form-item>
      <a-form-item label="密码" has-feedback>
        <a-input
          size="large"
          placeholder="请输入密码"
          type="password"
          v-decorator="['password',{rules:[{required:true,message:'请输入密码'}, {validator: confirmPass}]}]"
        />
      </a-form-item>
      <a-form-item label="确认密码" has-feedback v-if="current==='注册'">
        <a-input
          size="large"
          placeholder="请再次输入密码"
          type="password"
          v-decorator="['confirm',{rules:[{required:true,message:'请再次输入密码'}, {validator: confirmPassTwo}]}]"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item label="验证码" v-if="current==='注册'">
        <a-row :gutter="31">
          <a-col :span="18">
            <a-input
              size="large"
              placeholder="请输入验证码"
              v-decorator="['valid',{rules:[{required:true,message:'请输入验证码'},{validator: confirmPass}]}]"
            />
          </a-col>
          <a-col :span="4">
            <a-button type="primary" size='large'>获取验证码</a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item :wrapper-col="{}">
        <a-button size='large' type="primary" html-type="submit" class="login-form-button">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { stripStr } from "@/utils/validator";
export default {
  props: {
    current: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      formLayout: "vertical",
      confirmDirty: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
        } else {
          console.log(err);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    confirmPass(rule, value, callback) {
      if (value) {
        if (this.confirmDirty) {
          this.form.validateFields(["confirm"], { force: true });
          callback();
        }
        let s = stripStr(value);
        if (s) {
          callback();
        } else {
          if (rule.field === "valid") {
            callback("验证码不能有特殊字符");
          }
          if (rule.field === "password") {
            callback("密码不能有特殊字符");
          }
        }
      }
    },
    confirmPassTwo(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("两次输入密码不正确");
      } else {
        callback();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  width: 500px;
}
.login-form-button {
  width: 100%;
}
</style>