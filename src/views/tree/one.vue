<template>
  <ul>
    <li v-for="(item, index) in treeData" :key="index">
      <div class="item">
        <div class="item-left">
          <van-checkbox
            v-model="item.checked"
            @change="handleCheck(item)"
            checked-color="#07c160"
            v-if="item.checked=='middle'"
          ></van-checkbox>
          <van-checkbox v-model="item.checked" @change="handleCheck(item)" v-else></van-checkbox>

          <span class="title" @click="handleSelect(item)">{{item.label}}</span>
        </div>
        <div v-show="item.children && item.children.length">
          <van-icon name="arrow-up" @click="handleExpand(item)" v-if="item.expand" />
          <van-loading type="spinner" size="16px" v-else-if="item.loading" />
          <van-icon name="arrow-down" @click="handleExpand(item)" v-else />
        </div>
        <!-- <span
          :class="{arrowTransform: item.expand, arrow: true}"
          @click="handleExpand(item)"
          v-show="item.children && item.children.length"
        >&gt;</span>-->
      </div>

      <transition name="fade">
        <my-self-tree v-show="item.expand" :tree-data="item.children" :flat-tree="flatTree"></my-self-tree>
      </transition>
    </li>
  </ul>
</template>

<script>
export default {
  name: "MySelfTree",
  props: ["treeData", "flatTree"],
  data() {
    return {
      loading: false
    };
  },
  methods: {
    //展开或收起
    handleExpand(item) {
      //   this.loading = true;

      var expand = item.expand,
        nodeKey = item.nodeKey;
      var node = this.flatTree[nodeKey].node;
      this.$set(node, "loading", true);
      setTimeout(() => {
        this.$set(node, "expand", !expand);
      }, 1000);

      setTimeout(() => {
        this.$set(node, "loading", false);
      }, 1000);
    },
    //节点选中
    handleSelect(item) {
      var nodeKey = item.nodeKey;
      var node = this.flatTree[nodeKey].node;
      var currentSelectedKey = this.flatTree.findIndex(obj => {
        return obj.node.selected;
      });
      //每次只能选择一个
      if (currentSelectedKey >= 0 && currentSelectedKey != item.nodeKey) {
        this.$set(this.flatTree[currentSelectedKey].node, "selected", false);
      }
      this.$set(node, "selected", !node.selected);
      this.getSelectNodes();
    },
    //节点勾选
    handleCheck(item) {
      var checked = item.checked,
        nodeKey = item.nodeKey;
      var node = this.flatTree[nodeKey].node;
      this.$set(node, "checked", checked);
      this.$set(node, "selected", checked);
      this.updateTreeUp(nodeKey);
      this.updateTreeDown(node, { checked: checked });
      this.getCheckedNodes();
    },
    //判断当前勾选节点的父节点是否需要勾选
    updateTreeUp(nodeKey) {
      var parentKey = this.flatTree[nodeKey].parent;
      var childrenKey = "children";
      if (typeof parentKey == "undefined") return;

      var node = this.flatTree[nodeKey].node;
      var parent = this.flatTree[parentKey].node;
      if (node.checked == parent.checked) return;

      if (node.checked == true) {
        console.log(node.checked);
        this.$set(
          parent,
          "checked",
          parent[childrenKey].every(function(node) {
            return node.checked;
          })
        );
      } else {
        console.log(parent);
        // this.$set(parent, "checked", false);
        let checkall = this.checkall(parent);
        console.log("checkall", checkall);
        this.$set(parent, "checkedall", false);
      }
      this.updateTreeUp(parentKey);
    },
    checkall(node) {
      if (node.children) {
        node.children.forEach(item => {
          if (item.checked) {
            return this.checkall(item);
          } else {
            return false;
          }
        });
      }
    },
    //判断当前勾选节点的子节点是否勾选
    updateTreeDown(node) {
      var changes =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var childrenKey = "children";

      for (var key in changes) {
        this.$set(node, key, changes[key]);
      }
      if (node[childrenKey]) {
        node[childrenKey].forEach(
          function(child) {
            if (child.type === "user" && child.type) {
              console.log("user");
            } else {
              this.updateTreeDown(child, changes);
            }
          }.bind(this)
        );
      }
    },
    //获取已勾选节点
    getCheckedNodes() {
      var arr = this.flatTree
        .filter(item => {
          return item.node.checked;
        })
        .map(item => {
          return item.node;
        });
    },
    //获取已选中节点
    getSelectNodes() {
      console.log("获取已选中节点");
      var arr = this.flatTree
        .filter(item => {
          return item.node.selected;
        })
        .map(item => {
          return item.node;
        });
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
  padding: 10px 0 10px 10px;
  font-size: 18px;
}
.item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 10px;
  padding-right: 10px;
}
.item-left {
  display: flex;
  align-items: center;
}
.title {
  margin-left: 8px;
}
.arrow {
  cursor: pointer;
  display: inline-block;
  transition: transform 0.3s;
}
.arrowTransform {
  transform: rotate(90deg);
}
.selected {
  /* background: #2b85e4; */
}
</style>