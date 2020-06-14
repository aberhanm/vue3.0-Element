<template>
  <div>
    <div class="wrap" v-for="(item,key) in dbarr" :key="key">
      <div class="dbname">
        <input type="text" v-model="item.name" />
      </div>
      <ul>
        <li v-for="(tb,k1) in item.dbtable" :key="k1" :class="['tables',item.dbtable.length===1? 'border-none':'']">
          <div class="tab-con">
            <div class="table-name">
              <input type="text" v-model="tb.name" />
            </div>
            <div class="tableop">
              <button v-if="k1===item.dbtable.length-1" @click="newtab(item)">新增</button>
              <button @click="deletetb(item,k1)">删除</button>
            </div>
          </div>

          <ul class="table-col">
            <li v-for="(col,k2) in tb.dbcol" :key="k2" :class="[tb.dbcol.length===1? 'border-none':'45']">
              <div class="table-name">
                <input type="text" v-model="col.name" />
              </div>
              <div class="button">
                <button v-if="k2===tb.dbcol.length-1" @click="newcol(tb)">新增</button>
                <button @click="deletecol(tb,k2)">删除</button>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <button @click="submit">查看</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dbarr: [
        {
          name: "database1",
          dbtable: [
            {
              name: "table1",
              dbcol: [
                {
                  name: "tab1-col1"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    newtab(item) {
      console.log(item);
      let obj = {
        name: "table1",
        dbcol: [
          {
            name: "tab1-col1"
          }
        ]
      };
      item.dbtable.push(obj);
    },
    newcol(item) {
      let obj = {
        name: "tab1-col1"
      };
      item.dbcol.push(obj);
      console.log();
    },
    deletecol(tb, k2) {
      if (tb.dbcol.length > 1) {
        tb.dbcol.forEach((ele, key) => {
          if (key === k2) {
            tb.dbcol.splice(key, 1);
          }
        });
      }

      console.log(tb, k2);
    },
    submit() {
      console.log(this.dbarr);
    }
  }
};
</script>

<style lang="less"  scoped>
button {
  width: 47px;
  text-align: center;
}
.wrap {
  display: flex;
  align-items: center;
  width: 900px;
  margin: 20px;
  border: 1px solid #aaa;
  .dbname {
    width: 300px;
    text-align: center;
  }
  ul {
    list-style: none;
    .tables {
      display: flex;
      align-items: center;
      border-left: 1px solid #aaa;
      position: relative;
      .tab-con {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        width: 350px;
      }
      .table-col {
        width: 350px;
        border-left: 1px solid #aaa;
        li {
          display: flex;
          align-items: center;
          height: 40px;
          padding-left: 20px;
          border-bottom: 1px solid #aaa;
          position: relative;
          .button {
            position: absolute;
            right: 20px;
          }
        }
      }
    }
    .tables {
      border-bottom: 1px solid #aaa;
    }
    .border-none {
      border-bottom: none !important;
    }
    .tableop {
      display: flex;
    }
    button {
      margin-right: 5px;
    }
  }
}
</style>

