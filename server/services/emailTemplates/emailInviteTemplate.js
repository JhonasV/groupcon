module.exports = (groupName, inviteUrl) => {
  return `
            <body>           
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">     
                <div class="col s12 m7">
                    <h2 class="header">URL INVITE FROM GROUPCON</h2>
                    <div class="card horizontal">
                    <div class="card-stacked">
                        <div class="card-content">
                        <p>YOU HAVE BEEN INVITE TO BE PART OF THE GROUP '${groupName.toUpperCase()}'</p>
                        </div>
                        <div class="card-action">
                        <a target='_blank' class='waves-effect waves-blue btn' href="${inviteUrl}">CLICK HERE</a>
                        </div>
                    </div>
                    </div>
                </div>
            </body>`;
};
