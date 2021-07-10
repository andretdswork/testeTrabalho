window.onload = () => Procedimentos()


    function Procedimentos() {
        listaProcedimentos = []
        procedimentosSelecionados = []
        controleProcedimentosSelecionados = {
            header: '',
            details: []            
        }

        function constructor() {            
            InicializarLista()
            PopularTabela()
            CarregarEventos()
        }

        function InicializarLista() {
            for (let index = 1; index <= 10; index++) {
                this.listaProcedimentos.push({
                    id : index,
                    descricao: `Procedimento ${index}`,
                    selecionado: false
                })
            }
        }

        function CarregarEventos() {
            var el = document.querySelectorAll("tr")
            for (let index = 0; index < el.length; index++) {
                el[index].addEventListener('click', SelecionarProcedimento)
            }

            document.getElementById('btnMostrarProcedimentos').addEventListener('click', MostrarProcedimentosSelecionados)
        }        

        function SelecionarProcedimento(event) {            
            procedimentosSelecionados = procedimentosSelecionados.filter(item => item.id !== event.target.value)            
            if (event.target.checked){
                procedimentosSelecionados.push({
                    id: event.target.value,
                    ultimoEstado: event.target.checked,
                    descricao : event.path[2].outerText
                })
            }            
        }

        function MostrarProcedimentosSelecionados() {
            let content = document.getElementById('procedimentosSelecionados')
            content.innerHTML = PrepararConteudoProcedimento(content)
            procedimentosSelecionados = []
            PopularTabela()     
            CarregarEventos()
        }

        function PrepararConteudoProcedimento(content){            
            let contentHtml = RetirarConteudoProcedimento(content.innerHTML)
            contentHtml += '<section><h6>Procedimentos</h6>'
            for (const iterator of procedimentosSelecionados) {
                contentHtml += `
                    <span>${iterator.descricao} </span><br/>
                `
            }
            contentHtml +='</section>'
            return contentHtml
        }

        function RetirarConteudoProcedimento(content) {
            let startPosition = content.indexOf("<section>");
            if (startPosition > 0) {
                let finalPosition = content.lastIndexOf("</section>");
                return content.replace(content.substring(startPosition, finalPosition), '');
            }
            return content
        }

        function PopularTabela() {
            let tbody = document.getElementsByTagName('tbody')[0]            
            let innerHTML = ''
            for (const item of listaProcedimentos) {
                innerHTML += `
                    <tr>
                        <td>
                            <input type="checkbox" ${item.selecionado == true ? 'checked' : ''} value="${item.descricao}"/> ${item.descricao}
                        </td>                        
                        <td>
                            ${item.descricao}
                        </td>
                    </tr>
                `
            }            
            tbody.innerHTML = innerHTML
        }
        constructor()
    }    