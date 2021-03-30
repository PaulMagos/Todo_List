<template>
  <div class="todo-item">
  <!-- Left part of the activity with name, checkbox and editing box -->
  <div class="todo-item-left w3-container w3-left">
    <label>
      <input class="w3-check w3-round w3-green" type="checkbox" v-model="completed" @change="edited">
    </label>
    <div v-if="!editing" @dblclick="editItem" class="w3-padding w3-animate-opacity"
         :class="{ completed : todo.completed }">{{title}}</div>
    <label v-else>
      <input  class="todo-item-edit w3-animate-right" type="text" v-focus v-model="title"  @blur="edited"
             @keyup.enter="edited" @keyup.esc="cancelEdit">
    </label>
  </div>

  <!--Buttons for edit, delete and confirm actions-->
    <div class="edit-div w3-container w3-right">
      <div v-if="!editing" class="modify-item" @click="editItem">&#9998;</div>
      <div v-if="!editing" class="delete-item" @click="removeTodo(todo.id)">&times;</div>
      <div v-if="editing" class="confirm-item" @click="edited(todo)">&check;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo:{
      type: Object,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      'id': this.todo.id,
      'title': this.todo.title,
      'completed': this.todo.completed,
      'editing': this.todo.editing,
      'beforeEdit': '',
    }
  },
  watch:{
    checkAll(){
      this.completed = this.checkAll ? true : this.todo.completed
    }
  },
  directives:{
    focus: {
      inserted: function (el){
        el.focus()
      }
    }
  },
  methods:{
    removeTodo(id){
      // eslint-disable-next-line no-undef
      this.$emit('removedTodo', id)
    },
    editItem(){
      this.beforeEdit = this.title;
      this.editing = true;
    },
    edited(){
      if(this.title.trim().length === 0) this.title = this.beforeEdit
      this.editing = false
      // eslint-disable-next-line no-undef
      this.$emit('Edited', {
          'id': this.id,
          'title': this.title,
          'completed': this.completed,
          'editing': this.editing,
      })
    },
    cancelEdit(){
      this.title = this.beforeEdit
      this.editing = false
    },
  }
}
</script>

<style scoped>
</style>