<template>
  <div class="w3-container">

    <!-- Input form for activities -->
    <label>
      <input type="text" class="todo-input w3-animate-input"
             placeholder="What needs to be done?" v-model="name" @keyup.enter="addTodo">
    </label>
    <!-- Iterate till the end of the todos -->
    <todo-item class="w3-animate-left" v-for="(todo) in activitiesFilter" :key="todo.id" :todo="todo" :checkAll="!anyRemaining" @removedTodo="removeTodo" @Edited="finishedEdit">
    </todo-item>

    <!-- Container for the check all and the tod0 left -->
    <div class="options-container">
        <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAll"> Check All</label></div>
        <div>{{remaining}} items left</div>
    </div>

    <!-- Bar with filter for all, active and completed todos. At the right the clear completed button -->
    <div class="options-container">
      <div class="w3-bar w3-light-gray w3-round">
        <button class="w3-bar-item w3-button w3-round" :class="{'w3-green': filter === ''}" @click="filter = ''">All</button>
        <button class="w3-bar-item w3-button w3-round" :class="{'w3-green': filter === 'active'}" @click="filter = 'active'">Active</button>
        <button class="w3-bar-item w3-button w3-round" :class="{'w3-green': filter === 'completed'}" @click="filter = 'completed'">Completed</button>
        <button v-if="showClear" class="w3-bar-item w3-button w3-round w3-animate-opacity w3-right w3-red" v-touch="clearCompleted" @click="clearCompleted">Clear Completed</button>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";
export default {
  name: 'TodoList',
  components: {TodoItem},
  data () {
      return {
        name: '',
        idGen: 1,
        beforeEdit: '',
        filter: '',
        todos: [
        ]
    }
  },

  computed:{
    remaining(){
      return this.todos.filter(todo => !todo.completed).length
    },
    anyRemaining() {
      return this.remaining !== 0
    },
    activitiesFilter(){
      if(this.filter === 'active'){
        return this.todos.filter(todo => !todo.completed)
      }else if(this.filter === 'completed'){
        return this.todos.filter(todo => todo.completed)
      }
      return this.todos
    },
    showClear(){
      return this.todos.filter(todo => todo.completed).length > 0
    }
  },
  directives:{
    focus:{
      inserted: function (el){
        el.focus()
      }
    }
  },
  methods: {
    addTodo(){
      // If the box is empty i don't add anything
      if(this.name.trim() === '') return
      // Push the new activity
      this.todos.push({
        id: this.idGen,
        title: this.name,
        completed: false,
        editing: false,
      })
      // Reset the name and increase the id counter
      this.name = ''
      this.idGen++
    },
    removeTodo(id){
      const tmp = this.todos.findIndex((todo) => todo.id === id)
      this.todos.splice(tmp, 1)
    },
    checkAll(){
      this.todos.forEach((todo) => todo.completed = event.target.checked)
    },
    clearCompleted(){
      this.todos = this.todos.filter(todo => !todo.completed)
    },
    finishedEdit(data){
      const tmp = this.todos.findIndex((todo) => todo.id === data.id)
      this.todos.splice(tmp, 1, data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  .todo-input{
    width: 80%;
    padding: 10px 20px;
    font-size: 20px;
    margin-bottom: 16px;
    border: 0;
    border-bottom: 1px solid lightgrey;
    border-radius: 4px;

    &:focus{
      outline: 0;
    }
  }
  .todo-item{
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover{
      .delete-item{
        color: black;
      };
      .modify-item{
        color: red;
      }
    }
  }

  .edit-div{
    margin-left: 14px;
    display: inline-block;
  }
  .delete-item{
    cursor: pointer;
    float: left;
    margin-left: 13px;
    margin-right: 13px;
    color: white;
  }
  .modify-item{
    cursor: pointer;
    float: left;
    color: white;
    &:hover{
      color: red;
    }
  }
  .confirm-item{
    cursor: pointer;
    float: left;
    &:hover{
      color: lawngreen;
    }
  }

  .todo-item-left{
    display: flex;
    align-items: baseline;
  }
  .todo-item-label{
    padding: 10px;
    //margin-left: 12px;
    &:hover{
      cursor: pointer;
    }
  }
  .todo-item-edit{
    font-size: 20px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid black;
    border-radius: 4px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }

  .completed {
    text-decoration: line-through;
    color: darkgray;
  }

  .options-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }

  button{
    font-size: 14px;
    background-color: white;
    appearance: none;

    &:hover {
      background: lightgreen;
    }

    &:focus {
      outline: none;
    }
  }

  .active{
    background: lightgreen;
  }

  .fade-enter-active, fade-leave-active{
    transition: opacity .2s;
  }

  .fade-enter, fade-leave-to{
    opacity: 0;
  }
</style>
