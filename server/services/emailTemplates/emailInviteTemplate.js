module.exports = (groupName, inviteUrl) => {
  return `<!DOCTYPE html>
                <html>
                    <head>
                        <link rel='stylesheet' href='/../../client/public/css/bootstrap.min.css'/>
                    </head>
                    <body>                
                        <div class='row'>
                            <div class='col card'>
                                <div class='card-header bg-primary'>
                                    <h3 class='text-white'>GroupCon invitation to ${groupName}</h3>
                                </div>
                                <div class='card-body'>
                                    <a class='btn btn-primary btn-block' target='_blank' href='${inviteUrl}'>Go to group</a>
                                </div>
                            </div>
                        </div>
                    </body>
                </html>`;
};
