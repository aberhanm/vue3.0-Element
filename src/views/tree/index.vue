<template>
  <MySelfTree :tree-data="treeData" :flat-tree="flatTree"></MySelfTree>
  <!-- <ul>
    <li v-for="(item, index) in treeData" :key="index">
      <span
        :class="{arrowTransform: item.expand, arrow: true}"
        @click="handleExpand(item)"
        v-show="item.children && item.children.length"
      >&gt;</span>
      <input type="checkbox" v-model="item.checked" @change="handleCheck(item)" />
      <span :class="{selected: item.selected}" @click="handleSelect(item)">{{item.label}}</span>
      <transition name="fade">
        <my-self-tree v-show="item.expand" :tree-data="item.children" :flat-tree="flatTree"></my-self-tree>
      </transition>
    </li>
  </ul>-->
</template>

<script>
import MySelfTree from "./one";
export default {
  // register the component
  components: { MySelfTree },
  data() {
    return {
      treeData: [],
      flatTree: []
    };
  },
  created() {
    //模拟请求数据
    setTimeout(() => {
      var arr = [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                  children: [
                    {
                      label: "四级 1-1-1"
                    }
                  ]
                }
              ]
            },
            {
              label: "二级 1-1"
            },
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                  children: [
                    {
                      label: "user 1-1-1",
                      type: "user"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ];
      this.treeData = this.compileTreeData(arr);
      this.flatTree = this.compileFlatTree(arr);
    }, 1000);
  },
  methods: {
    //数据初始化(添加某些必要属性)
    compileTreeData(arr) {
      function newAttr(node, parent) {
        node.expand = false; //是否展开
        node.checked = false; //是否勾选
        node.selected = false; //是否选中
        if (node.children) {
          node.children.forEach(child => {
            return newAttr(child, node);
          });
        }
      }
      arr.forEach(item => {
        newAttr(item);
      });
      return arr;
    },
    //编制各节点对应关系
    compileFlatTree(arr) {
      var keyCounter = 0;
      var childrenKey = "children";
      var flatTree = [];
      function flattenChildren(node, parent) {
        node.nodeKey = keyCounter++;
        flatTree[node.nodeKey] = {
          node: node,
          nodeKey: node.nodeKey
        };
        if (typeof parent != "undefined") {
          flatTree[node.nodeKey].parent = parent.nodeKey;
          flatTree[parent.nodeKey][childrenKey].push(node.nodeKey);
        }
        if (node[childrenKey]) {
          flatTree[node.nodeKey][childrenKey] = [];
          node[childrenKey].forEach(function(child) {
            return flattenChildren(child, node);
          });
        }
      }
      arr.forEach(function(rootNode) {
        flattenChildren(rootNode);
      });
      return flatTree;
    }
  }
};
</script>

<style>
</style>