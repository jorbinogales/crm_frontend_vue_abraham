<template>
  <section class="lg__page">
      <div class="container-fluid h-full p-lr-0">
          <div class="row__fluid__container h-full">
            <div class="set-bg-0" style="background-image: url(/assets/images/1682.svg)"></div>
            <div class="wrap__styele__lg flex-col-l-m h-full w-full bg2">
                <div class="container__form_lg">
                    <div class="p-t-20">
                        <Login v-if="$route.name === 'Login'"  />
                        <Register v-if="$route.name === 'Register'"/>
                    </div>
                    {{ email }}
                </div>
            </div>
          </div>
      </div>
  </section>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'Home',
  components: {
    Login,
    Register
  }
}
</script>
