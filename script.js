import Vue from 'vue';
import App from './App.vue';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { timeEnd } from 'console';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

Vue.prototype.$db = db;

new Vue({
  render: h => h(App),
}).$mount('#app');


Vue.component('booking',
  {
    props: ["id"],
    template: `<div :class="''animated fadeInRight component booking'+id">
    <h1 v-if="afterSubmit" class = "animated bounceIn">Booking Confirmed</h1>
    
    </div>`,

    data()
    {
      return{
      afterSubmit: false,
      timeStarted: '',
      timeEnding: '',
      dateSelected: 'notselected',
      date:'',
      bookedTime: [],
      alltime: [9,10,11,12,2,3],
      validationName: false,
      validationDate: false,
      validationTime: false
    }
    },

    methods:
    {
      checkDate()
      {
        let date = document.getElementsByClassName('datepicker')[0].value;
        this.date=date;
        if(this.date)
          {
            this.dateSelected = 'selected';
            this.$http.get('').then(function(data){
              let savedData = Object.values(data.body);
              for(let x = 0;x<savedData.length;x++)
                {
                  if(savedData[x].date == this.date)
                    {
                      this.bookedTime.push(parseInt(savedData[x].time));
                    }
                }
                console.log(this.bookedTime)
            })
          }
          else
          {
            this.notification('first-noti')
          }
      },
      post()
      {

        let time = documnet.getElementsByClassName('time')[0].value;
        this.checkDate();
        (!this.date)?this.notification('second-noti'):this.validationDate = true;
        (!time)?this.notification('third-noti'):this.validationTime = true;
        (!this.customerName)?this.notification('last-noti'):this.validationName = true;
        if(this.validationDate == true & this.validationName == true & this.validationTime == true)
          {
            this.$http.post('',{
              "customerName": this.customerName,
              "customerNumber": this.customerNumber,
              "date":this.date,
              "time":this.time,
              "status":"pending"
            }).then(function(data)
            {
              this.afterSubmit = true;
            })
          }

      }
    }

  })

  document.addEventListener('DOMContentLoaded',function(){
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems,{minDate: new Date()})
  })


const addMachine = async () => {
  try {
    await db.collection('machines').doc('machine1').set({
      name: 'Machine 1',
      description: 'Description of Machine 1'
    });
    console.log('Machine added successfully');
  } catch (error) {
    console.error('Error adding machine: ', error);
  }
};

const addAvailability = async () => {
  try {
    await db.collection('machines').doc('machine1').collection('availability').add({
      startTime: '2024-05-20T09:00:00',
      endTime: '2024-05-20T18:00:00',
      available: true
    });
    console.log('Availability added successfully');
  } catch (error) {
    console.error('Error adding availability: ', error);
  }
};
