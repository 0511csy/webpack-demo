// var APP_ID = '4cSNW4wXcbqktO1KVMrn7sW6-gzGzoHsz';
// var APP_KEY = 'vw2J6m51qjpgkMfENEs1S8AU';
//
// AV.init({
//     appId: APP_ID,
//     appKey: APP_KEY
// });
//
//
//
// var query = new AV.Query('Message');
// query.find()
//     .then(
//         function (messages) {
//             let array = messages.map((item)=> item.attributes);
//             array.forEach((item)=>{
//                 let li = document.createElement('li');
//                 li.innerTEXT = `${item.name}: ${item.content}`;
//                 let messageList = document.querySelector('#messageList');
//                 messageList.appendChild(li);
//             })
//         }
//     )
//
// let form = document.querySelector('#postMessageForm');
//
// form.addEventListener('submit',function (e) {
//     e.preventDefault();
//     let content = form.querySelector('input[name=content]').value;
//     let name = form.querySelector('input[name=name]').value;
//     var Message = AV.Object.extend('Message');
//     var message = new Message();
//     message.save({
//         'name': name,
//         'content':content
//     }).then(function (object) {
//         let li = document.createElement('li')
//         li.innerText = `${object.attributes.name}: ${object.attributes.content}`
//         let messageList = document.querySelector('#messageList')
//         messageList.appendChild(li)
//         form.querySelector('input[name=content]').value = ''
//         console.log(object);
//     });
// });
!function(){
    var model = {
        init:function () {
            var APP_ID = '4cSNW4wXcbqktO1KVMrn7sW6-gzGzoHsz';
            var APP_KEY = 'vw2J6m51qjpgkMfENEs1S8AU';
            AV.init({appId: APP_ID, appKey: APP_KEY});
        },
        fetch:function () {
            var query = new AV.Query('Message');
            return query.find();
        },
        save:function (name,content) {
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({
                'name': name,
                'content':content
            })
        }
    }
    var view = document.querySelector('section.message');
    var controller = {
        view:null,
        model:null,
        messageList:null,
        init:function(view,model){
            this.view = view;
            this.model = model;
            this.messageList = view.querySelector('#messageList');
            this.form = view.querySelector('form');
            this.model.init();
            this.loadMessages();
            this.bindEvents();
        },
        loadMessages:function () {
            //重新打开页面获取数据
            this.model.fetch().then(
                (messages)=> {
                    let array = messages.map((item)=> item.attributes)
                    array.forEach((item)=>{
                        let li = document.createElement('li')
                        li.innerText = `${item.name}: ${item.content}`
                        this.messageList.appendChild(li)
                    })
                }
            )
        },
        bindEvents:function () {
            this.form.addEventListener('submit',(e)=>{
                e.preventDefault();
                this.saveMessage();
            })
        },
        saveMessage:function () {
            let myForm = this.form;
            let content = myForm.querySelector('input[name=content]').value;
            let name = myForm.querySelector('input[name = name]').value;
            this.model.save(name,content).then(function (object) {
                let li = document.createElement('li');
                li.innerText = `${object.attributes.name}:${object.attributes.content}`;
                let messageList = document.querySelector('#messageList');
                messageList.appendChild(li);
                myForm.queryselector('input[name=content]').value = '';
                console.log(object);
            })
        }
    }
    controller.init(view,model);
}.call()