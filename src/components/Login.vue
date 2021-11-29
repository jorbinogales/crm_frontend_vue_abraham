<template>
    <div class="container__form_lg">
        <div class="p-t-20">
            <form  name="formLogin" method="post"  @submit="login">
                <h4 class="ltext-101 cl1">
                    Bienvenido
                </h4>
                <p class="stext-102 p-b-10">
                    Agrega tu Usuario y Contraseña para ingresar
                </p>
                <div class="m-t-10 cl-error stext-101 dis-none data-error" ref="request"></div>
                <div class="form-group form_input__style_01 p-b-5 m-t-20 cl1 cl5" ref="email">
                    <label for="email" class=" clase-cl  bg2">Correo Electrónico</label>
                    <input type="email" name="email" id="email" v-model="email"  @keyup="checkForm" class=" w-full stext-101 p-lr-12 p-t-13 p-b-10 cl3 plh0 bg2 wbs-0 disabled"  placeholder="example@email.com">
                    <div class="contendor__icon_input">
                        <div class="w-full h-full flex-col-l-m">
                            <i class="icon-mail fs18  clase-cl  p-t-2"></i>
                        </div>
                    </div>
                </div>
                <div class="m-t-10 cl-error stext-101 dis-none" data-error="email">Campo Incorrecto</div>
                <div class="form-group form_input__style_01 m-t-25 cl1 cl5" ref="clave">
                    <label for="clave" class="clase-cl  bg2">Contraseña</label>
                    <input type="password" name="clave" id="clave" ref="inputClave" v-model="clave" @keyup="checkForm" class=" w-full stext-101 p-lr-12 p-t-13 p-b-10 cl3 plh0 bg2 wbs-0 disabled"  placeholder="Introduce tu contraseña">
                    <div class="contendor__icon_input">
                        <div class="w-full h-full flex-col-l-m">
                            <div class="view_pass_icon p-t-2 view_eye_blocked" ref="button" @click="changePassword" style="cursor:pointer;">
                                <i class="icon-eye-blocked fs16 "></i>
                                <i class="icon-eye fs16 "></i>
                            </div> 
                        </div>
                    </div>
                </div>
                <div class="m-t-25 m-b-10">
                    <div class="w-full flex-w form-check">
                        <input type="checkbox" name="recordarme" id="recordar" value="recordar">
                        <label for="recordar" class="stext-101 cl3">Recuérdame</label>
                    </div>
                </div>
                <div class="m-t-25 w-full">
                    <button type="button" ref="submit" class="flex-c-m w-full stext-103 bg1 bg3 cl0 p-tb-15 btn-shadow-box0 btn-submit">
                        Ingresar
                    </button>
                </div>
                <div class="m-t-25 m-b-10 w-full">
                    <button type="button"  class="flex-c-m w-full stext-103 bg0 cl0 cl3 p-tb-10 btn-google-lg btn-shadow-box0" disabled="true">
                        <span class="m-r-8 fs18 p-t-5"><span class="icon-google"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span></span>  Ingresa con Google
                    </button>
                </div>
                <div class="p-t-20">
                    <div class="w-full flex-w">
                        <p class="stext-104 m-r-5">¿Aún no tienes una cuenta?</p>
                        <router-link :to="{name: 'Register'}" class="stext-105 text-decoration-01 cl4" >Regístrate Aquí</router-link>
                    </div>
                    <div class="w-full m-t-20 text-aling-center">
                        <button  type="button" class="stext-105 text-decoration-01 cl4" @click="modal('open')">Olvidé mi contraseña</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
<div class="gl-modal" ref="glModal">
    <button type="button" class="gl-modal__overlay"></button>
    <div class="gl-modal__dialog">
        <div class="gl-modal__main">
            <div class="gl-modal__main-content p-all-20">
                <form  name="formRecoverPassword" method="post" class="w-full h-full flex-col-l-m p-all-25 aling-items-center" @submit="rePass">
                    <h4 class="ltext-101 cl1">
                        ¡Recuperar es fácil!
                    </h4>
                    <p class="text-aling-center stext-105 cl3 p-t-10 p-lr-25">
                        Ingresa tu correo electrónico. Te enviaremos un link de recuperación
                    </p>
                    <div class="m-t-10 cl-error stext-101 dis-none data-error" ref="requestRe"></div>
                    <div class="form-group form_input__style_01 p-b-5 m-t-30 cl1 cl5" ref="correo" style="width:320px;">
                        <label for="correo" class=" clase-cl  bg0">Correo Electrónico</label>
                        <input type="email" name="correo" id="correo" v-model="correo"  @keyup="checkFormRe" class=" w-full stext-101 p-lr-12 p-t-13 p-b-10 cl3 plh0 bg2 wbs-0 disabled" placeholder="example@email.com"  >
                        <div class="contendor__icon_input">
                            <div class="w-full h-full flex-col-l-m">
                                <i class="icon-mail fs18  clase-cl  p-t-2"></i>
                            </div>
                        </div>
                    </div>
                    <div class="m-t-10 cl-error stext-101 dis-none" data-error="email">Campo Incorrecto</div>
                    <div class="m-t-25" style="width:320px;">
                        <button type="button" ref="submitRe" class="flex-c-m w-full stext-103 cl0 p-tb-10 bg1 bg3 btn-shadow-box0 btn-submit ">
                            Enviar Link
                        </button>
                    </div>
                </form>
            </div>
            <button type="button" class="gl-modal__close" @click="modal('close')">
                <i class="icon-close"></i>
            </button>
        </div>
    </div>
</div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Login',
  data: () => ({
      email: '',
      clave: '',
      correo: '',
      boleanoEmail: false,
      boleanoClave:false,
      boleanoCorreo: false,
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
      modal: function(acc){
          if ( acc == 'open' ){
              this.$refs.glModal.classList.add('gl-modal--active');
          }else{
              this.$refs.glModal.classList.remove('gl-modal--active');
          }
      },
      checkFormRe: function(e){
          if ( this.correo != '' && this.validate.test(this.correo) ){
               this.$refs.correo.classList.remove('cl5')
               this.$refs.correo.querySelector('input').classList.add('active');

              this.$refs.correo.classList.remove('cl-error')
              this.$refs.correo.querySelector('input').classList.remove('error')

              this.boleanoCorreo = true;
          }else{
              this.$refs.correo.classList.add('cl-error')
              this.$refs.correo.querySelector('input').classList.add('error')

              this.boleanoCorreo = false;
          }

          if( this.boleanoCorreo ){
              this.$refs.submitRe.setAttribute('type', 'submit');
              this.$refs.submitRe.classList.remove('bg3');
          }else{
              this.$refs.submitRe.setAttribute('type', 'button');
              this.$refs.submitRe.classList.add('bg3');
          }
      },
      checkForm: function(e){
         

          if ( (this.email != '' && this.validate.test(this.email))){
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
      login: function(e){
           e.preventDefault();
          axios({
				url: '/auth/login',
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
                    console.log(res.data);
                    window.localStorage["token"] = res.data.access_token;
                    this.$router.push({name: 'About',path: '/about'})
                }else{
                    this.$refs.request.innerHTML = 'Email o Contraseña Equivocada';
                    this.$refs.request.classList.add('dis-block');
                    setTimeout(() => {
                        this.$refs.request.classList.remove('dis-block');
                    }, 10000);
                }
			}).catch(err=>{
                this.$refs.request.innerHTML = 'Error Por favor intente mas tarde';
                this.$refs.request.classList.add('dis-block');
                 setTimeout(() => {
                    this.$refs.request.classList.remove('dis-block');
                    
                }, 10000);
			})
      },
      rePass: function(e){
          e.preventDefault();

          axios({
				url: 'user/forgot',
			    baseURL: process.env.VUE_APP_RUTA_API,
				method: 'post',
				data: {
					email: this.correo
			    }
		   })
           .then(res=>{
               console.log(res.data);
               if ( res.data.statusCode == 201 ){
                   this.$refs.requestRe.style.color = 'green';
                   this.$refs.requestRe.innerHTML = 'Correo Enviado';
                   this.$refs.requestRe.classList.add('dis-block');

                   this.$refs.submitRe.setAttribute('type', 'button');
                   this.$refs.submitRe.classList.add('bg3');

                    setTimeout(() => {
                        this.$refs.requestRe.classList.remove('dis-block');
                        this.$refs.glModal.classList.remove('gl-modal--active');
                    }, 10000);
               }else{
                   this.$refs.requestRe.setAttribute('style', '')
                   this.$refs.requestRe.innerHTML = 'Correo No Registrado';
                    this.$refs.requestRe.classList.add('dis-block');
                    setTimeout(() => {
                        this.$refs.requestRe.classList.remove('dis-block');
                    }, 10000);
               }
			}).catch(err=>{
                this.$refs.requestRe.innerHTML = 'Error Por favor intente mas tarde';
                this.$refs.requestRe.classList.add('dis-block');
                 setTimeout(() => {
                    this.$refs.requestRe.classList.remove('dis-block');
                }, 10000);
			})

      }
  }
} 
</script>