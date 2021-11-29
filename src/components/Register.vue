<template>
    <div class="container__form_lg" style="width: 390px;">
        <div class="p-t-20">
            <form  name="formRegister" method="post" @submit="register">
                <h4 class="ltext-101 cl1">
                        ¡Organiza tu despacho!
                    </h4>
                    <p class="stext-102 p-b-10">
                        Con Legal Leads podrás tener al día todas tus actividades y mejorar la atención a tus 
                        clientes. 
                    </p>
                    <div class="m-t-10 cl-error stext-101 dis-none data-error" ref="request"></div>
                    <div class="form-group form_input__style_01 p-b-5 m-t-20 cl1 cl5" ref="email">
                        <label for="email" class="clase-cl  bg2">Correo Electrónico</label>
                        <input type="email" ref="inputEmail" v-model="email" name="email" id="email" @keyup="checkForm" class="w-full stext-101 p-lr-12 p-t-13 p-b-10 cl3 plh0 bg2 wbs-0 disabled" placeholder="example@email.com">
                        
                        <div class="contendor__icon_input">
                            <div class="w-full h-full flex-col-l-m">
                                <i class="icon-mail fs18 clase-cl  p-t-2"></i>
                            </div>
                        </div>
                    </div>
                    <div class="m-t-10 cl-error stext-101 dis-none" data-error="email">Campo Incorrecto</div>
                    <div class="form-group form_input__style_01 m-t-25 cl1 cl5" ref="clave">
                        <label for="email" class=" clase-cl  bg2">Contraseña</label>
                        <input type="password" ref="inputClave" name="clave" id="clave" v-model="clave" @keyup="checkForm" class="w-full stext-101 p-lr-12 p-t-13 p-b-10 cl3 plh0 bg2 wbs-0 disabled" placeholder="Introduce tu contraseña">
                        <div class="contendor__icon_input">
                            <div class="w-full h-full flex-col-l-m">
                                <div class="view_pass_icon p-t-2 view_eye_blocked" type="button" @click="changePassword" style="cursor:pointer;">
                                    <i class="icon-eye-blocked fs16  clase-cl "></i>
                                    <i class="icon-eye fs16  clase-cl "></i>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div class="m-t-25">
                        <div class="w-full flex-w form-check">
                            <input type="checkbox" name="notification" id="notification">
                            <label for="notification" class="stext-101 cl3">Autorizo recibir noticias y promociones de parte de Legal Leads</label>
                        </div>
                    </div>
                    <div class="m-t-10 m-b-10">
                        <div class="w-full flex-w form-check">
                            <input type="checkbox" name="accept" id="accept">
                            <label for="accept" class="stext-101 cl3">Declaro que he leído y acepto los términos y condiciones, y las Políticas de Privacidad.</label>
                        </div>
                    </div>
                    <div class="p-t-5">
                        <div class="w-full flex-w">
                            <p class="stext-104 m-r-5">¿Ya tienes una cuenta?</p>
                            <router-link :to="{name: 'Login'}" class="stext-105 text-decoration-01 cl4" >Iniciar Sesión</router-link>
                        </div>
                    </div>
                    <div class="m-t-25 w-full">
                        <button type="button" ref="submit"  class="flex-c-m w-full stext-103 bg1 bg3 cl0 p-tb-15 btn-shadow-box0 btn-submit">
                            Crear Cuenta
                        </button>
                    </div>
                </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Register',
   data: () => ({
      email: '',
      clave: '',
      boleanoEmail: false,
      boleanoClave:false,
      switch: 0,
      validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  }),
  methods:{
      changePassword: function(){
          if ( this.switch == 0 ){
              this.$refs.button.classList.remove('view_eye_blocked');
              this.$refs.inputClave.setAttribute('type', 'text');
              this.$refs.button.classList.add('view_eye');
              this.switch = 1;

          }else if ( this.switch == 1  ){
              this.$refs.button.classList.remove('view_eye');
              this.$refs.inputClave.setAttribute('type', 'password');
              this.$refs.button.classList.add('view_eye_blocked');
              this.switch = 0;
              console.log("entro aqui");
          }
      },
      checkForm: function(e){
         // console.log(this.email);

          if ( this.email != '' && this.validate.test(this.email) ){
              this.$refs.email.classList.remove('cl5')
              this.$refs.email.querySelector('input').classList.add('active');

              this.$refs.email.classList.remove('cl-error')
              this.$refs.email.querySelector('input').classList.remove('error')

              this.boleanoEmail = true;
          }else{
              this.$refs.email.classList.add('cl-error')
              this.$refs.email.querySelector('input').classList.add('error')

              this.boleanoEmail = false;
          }

          if ( this.clave != '' ){
              this.$refs.clave.classList.remove('cl5')
              this.$refs.clave.classList.remove('cl-error')
              this.$refs.clave.querySelector('input').classList.add('active');
              this.$refs.clave.querySelector('input').classList.remove('error')


              this.boleanoClave = true;
          }else{
              this.$refs.clave.classList.add('cl-error')
              this.$refs.clave.querySelector('input').classList.add('error')

              this.boleanoClave = false;
          }


          if ( this.boleanoEmail && this.boleanoClave ){
              this.$refs.submit.setAttribute('type', 'submit');
               this.$refs.submit.classList.remove('bg3');
          }else{
              this.$refs.submit.setAttribute('type', 'button');
              this.$refs.submit.classList.add('bg3');
          }
          

      },
      register: function(e){
           e.preventDefault();
           const formData = new FormData()
           formData.append('clave', this.clave)
            formData.append('email', this.email)
          axios({
				url: '/auth/register',
			    baseURL: process.env.VUE_APP_RUTA_API,
				method: 'post',
				data: {
					email: this.email,
					password: this.clave
			    }
			})
            .then(res=>{
                if ( res.data.statusCode == 201 ){
                    console.log('inicio correctamente')
                    this.$refs.request.style.color = 'green';
                    this.$refs.request.innerHTML = 'Registrado Correctamente';
                    this.$refs.request.classList.add('dis-block');
                    this.$refs.submit.setAttribute('type', 'button');
                    this.$refs.submit.classList.add('bg3');
                    this.$refs.clave.classList.add('cl5')
                    this.$refs.clave.querySelector('input').classList.remove('active');
                    this.$refs.email.classList.add('cl5')
                    this.$refs.email.querySelector('input').classList.remove('active');
                    
                    this.clave = '';
                    this.email = '';

                    setTimeout(() => {
                        this.$router.push({name: 'Login',path: '/'})
                    }, 3000);
                    
                }else{
                    this.$refs.request.innerHTML = 'Email Ya Registrado. Ingrese otro Por favor';
                    this.$refs.request.classList.add('dis-block');
                    setTimeout(() => {
                        this.$refs.request.classList.remove('dis-block');
                    }, 10000);
                }
			}).catch(err=>{
                this.$refs.request.setAttribute('style', '');
                this.$refs.request.innerHTML = 'Error Por favor intente mas tarde';
                this.$refs.request.classList.add('dis-block');
                 setTimeout(() => {
                    this.$refs.request.classList.remove('dis-block');
                }, 10000);
			})
      }
  }
}
</script>