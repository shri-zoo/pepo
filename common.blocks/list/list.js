modules.define('list', ['BEMHTML','i-bem__dom','jquery'], function(provide,BEMHTML, BEMDOM){
    var loading=false,
        page=0;
    provide(BEMDOM.decl(this.name,
        {
            onSetMod: {
                'js': {
                    // выполняется при первом DOM-событии "click"
                    'inited': function () {
                        this._load();
                        this.bindToWin('scroll',this._onScroll);
                    }
                }
            },
            _onScroll: function () {
                if(window.pageYOffset-1>(document.body.scrollHeight-document.body.scrollHeight/page)&&loading===false){
                    this._load();
                }
            },
            _load:function(){
                loading=true;
                var domLoading=BEMDOM.append(this.domElem,"<span>Loading</span>");
                var domData=this._request();
                page++;
                BEMDOM.replace(domLoading,domData);
                console.log(domData);
                loading=false;
            },
            _request:function(){

                return '<div class="message"><div class="message-header"><a class="link link__control i-bem" data-bem="{&quot;link&quot;:{}}" role="link" tabindex="0"><img class="image" src="https://telegram.org/img/t_logo.png" height="60px"></a><a class="link link__control i-bem" data-bem="{&quot;link&quot;:{}}" role="link" href="https://telegram.org/img/t_logo.png">login</a></div><a class="message-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also</a><a class="preview-image" href="https://pp.vk.me/c630418/v630418888/42a0f/tQ5a0Cqyuek.jpg"><img class="image" src="https://pp.vk.me/c630418/v630418888/42a0f/tQ5a0Cqyuek.jpg" title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also"></a><div class="preview-geo">Sevastopol</div><a class="preview-link" href="https://telegram.org/img/t_logo.png"><img class="image" src="https://telegram.org/img/t_logo.png"><span>description</span></a></div>';
            }
        },
        {
        }
    ));

});
