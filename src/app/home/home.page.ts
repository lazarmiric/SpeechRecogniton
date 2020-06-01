import { Component } from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {ChangeDetectorRef} from '@angular/core';
import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';
import {HttpClient} from '@angular/common/http';
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    matches: string[];
    isRecording = false;

    constructor( public  navctrl: NavController, private  plt: Platform,
                 private speechRecognition: SpeechRecognition, private  cd: ChangeDetectorRef,
                 public http: HttpClient) {

    }
    startListen(){
        let options = {
            language: 'sr-RS'
        }
        this.speechRecognition.startListening().subscribe(matche => {
            this.matches = matche;
            this.cd.detectChanges();
        });
        this.isRecording = true;
    }

    upali(){
        return this.http.get('http://172.20.222.228:5000/');
    }
    ugasi(){
        return this.http.get('http://172.20.222.228:5000/ugasi');
    }
    osluskuj(){
        for(let word of this.matches){
            if(word == 'ugasi') this.onTurnOff()
            else if(word == 'upali')  this.onSubmit()
        }
    }


    onTurnOff(){
        this.ugasi().subscribe(
            (res: any) => {
                if (res.succeeded) {
                    console.log('uspeg');
                } else {
                    console.log('neuspeh')
                }
            });
    }

    onSubmit(){
        this.upali().subscribe(
            (res: any) => {
                if (res.succeeded) {
                    console.log('uspeg');
                } else {
                    console.log('neuspeh')
                }
        });
    }

    stopListening(){
        this.speechRecognition.stopListening().then(() => {
            this.isRecording = false;
        });
    }

    getPermissions(){
        this.speechRecognition.hasPermission()
            .then((hasPermission: boolean) => {
                if (!hasPermission) {
                    this.speechRecognition.requestPermission();
                }
            });
    }
    isIos(){
        return this.plt.is('ios');
    }

}




