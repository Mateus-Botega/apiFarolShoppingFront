<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Cadastro de Itens</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{ erro.field }}</b> - {{ erro.defaultMessage }}
        </li>
      </ul>

      <form @submit.prevent="salvar">

        <label>Código *</label>
        <input type="text" placeholder="Código" v-model="item.codigo">
        <label>Número De Série *</label>
        <input type="number" placeholder="Número De Série" v-model="item.nrSerie">
        <label>Disponilidade *</label>
        <input type="text" placeholder="Disponilidade" v-model="item.disponibilidade">
        <label>Status *</label>
        <input type="text" placeholder="Status" v-model="item.status">
        <label>Descrição *</label>
        <input type="text" placeholder="Descrição" v-model="item.descricao">
        <label>Localização *</label>
        <input type="text" placeholder="Localização" v-model="item.localizacao">
        <label>Data De Movimentação *</label>
        <input type="text" placeholder="Data De Movimentação" v-model="item.dtMovimentacao">


        <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>Código</th>
            <th>Número De Série</th>
            <th>Disponilidade</th>
            <th>Status</th>
            <th>Descrição</th>
            <th>Localizacao</th>
            <th>Data De Movimentação</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="item of itens" :key="item.id">

            <td>{{ item.codigo }}</td>
            <td>{{ item.nrSerie }} </td>
            <td>{{ item.disponibilidade }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.descricao }}</td>
            <td>{{ item.localizacao }}</td>
            <td>{{ item.dtMovimentacao }}</td>
            <td>
              <button @click="editar(item)" class="waves-effect btn-small blue darken-1"><i
                  class="material-icons">create</i></button>
              <button @click="remover(item)" class="waves-effect btn-small red darken-1"><i
                  class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>
</template>

<script>

import Item from './services/itens'
export default {
  name: 'app',
  data() {
    return {
      item: {
        codigo: '',
        nrSerie: '',
        disponibilidade: '',
        status: '',
        descricao: '',
        localizacao: '',
        dtMovimentacao: ''
      },
      itens: [],
      errors: []
    }
  },

  mounted() {
    this.listar()
  },

  methods: {

    listar() {
      Item.listar().then(resposta => {
        this.itens = resposta.data
      }).catch(e => {
        console.log(e)
      })
    },

    salvar() {
      if (!this.item.id) {
        Item.salvar(this.item).then(resposta => {
          this.itens = {}
          alert('Item cadastrado com sucesso')
          this.listar()
          this.errors = {}
          window.location.reload(true);
          this.item = resposta.data
        }).catch((error) => {
          console.log(error);
        });
      } else {
        Item.atualizar(this.item).then(resposta => {
          this.itens = {}
          this.errors = {}
          this.item = resposta.data
          alert('O item selecionado foi atualizado com sucesso')
          this.listar()
          window.location.reload(true);
        }).catch(e => {
          this.errors = e.response.data.error
        })
      }
    },

    editar(item) {
      this.item = item
    },

    remover(item) {
      if (confirm('Deseja realmente excluir esse item')) {
        Item.apagar(item).then(resposta => {
          this.listar()
          this.errors = {}
          window.location.reload(true);
          this.item = resposta.data
        }).catch(e => {
          this.errors = e.response.data.error
        })
      }
    }
  }
}

</script>

<style>
</style>
