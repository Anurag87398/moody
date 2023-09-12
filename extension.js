// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

class MyWebviewViewProvider {
	constructor(context) {
	  this.context = context;
	}
  
	resolveWebviewView(webviewView) {

		//defining all moods
		const moods = {
			//0
			'Im Feeling Lonely': 'https://media.tenor.com/dza0F8SCVvUAAAAC/johncena-john.gif',
			'Siuuuu': 'https://res.cloudinary.com/dqjk6trlx/image/upload/v1683393139/Moody/siuuu_kvsssq.gif',
			'Happy Happy Happy': 'https://media.tenor.com/arqlNu8gyJYAAAAM/cat-cat-jumping.gif',
			'You did it!': 'https://www.hubspot.com/hubfs/Smiling%20Leo%20Perfect%20GIF.gif',
			'Noice!': 'https://media.tenor.com/wE1IgNqxoqkAAAAC/noice.gif',
			'We won Mr. Stark': 'https://media.tenor.com/I1nndcPxVtIAAAAd/we-won-mr-stark.gif',
			'We\'ve been blessed!': 'https://i.kym-cdn.com/photos/images/newsfeed/001/959/603/211.png',
			'Woooh! Yeaahhh!': 'https://media.tenor.com/mrSgk5KdrhYAAAAC/minions-celebrate.gif',


			//0-5
			'Suspicious': 'https://media.tenor.com/rB8hWIin-2IAAAAM/hmm-suspect.gif',
			'Hmmmm': 'https://thumbs.gfycat.com/HonorableHandyLiger-size_restricted.gif',
			'stares in sus': 'https://i.gifer.com/1lwr.gif',
			'What\'s Cookin?': 'https://media.tenor.com/oslAUCxTbO4AAAAC/rock-sus.gif',
			'Sus': 'https://wallpaperaccess.com/full/4707938.jpg',

			// 5-10
			'Thak gaya hu bro': 'https://i.kym-cdn.com/photos/images/newsfeed/002/091/575/a0b.gif',
			'Kakj': 'https://i.imgflip.com/4co4m2.png?a467232',
			'Life is Sad': 'https://wallpapers.com/images/hd/black-and-white-sad-meme-qq7lsi1qvp3di2xd.jpg',
			'Ok': 'https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fphotos%2Fimages%2Fnewsfeed%2F001%2F878%2F329%2Fdfa.jpg',
			

			//>10
			'Paaaainnnn': 'https://media.tenor.com/QplCmNAM7lwAAAAC/captain-ray-holt-pain.gif',
			'Noo God Noo!': 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDVlMmU4NzdhMTU4OWJiMjQ5MTJkODQ4YzBjZWNmYjEwMDQwYWEzNiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/KhliiAkDFP9YY/giphy.gif',
			'This is the Worst': 'https://gifdb.com/images/thumbnail/michael-scott-biting-his-lip-pdv9wj5z6bhdozds.gif',
			'Livin the Life!': 'https://media.tenor.com/ogv3YFQlHmAAAAAC/im-gonna-go-cry-in-the-bathroom-peace-out.gif',
			'Whaat?': 'https://media.tenor.com/3uNzbnxnr90AAAAC/what-wtf.gif'
		  };
		
		// Create and set up your webview panel
		const panel = webviewView.webview;  

		//function to update the mood whenever the diagnostic changes
		const updateWebview = (errorCount) => {
			if(errorCount==0){
				const choices= ['Im Feeling Lonely','Siuuuu','You did it!','Noice!','We won Mr. Stark','We\'ve been blessed!','Woooh! Yeaahhh!'];
				const mood = choices[Math.floor(Math.random()*choices.length)];
				// panel.title = mood;
				panel.html= getWebviewContent(mood, errorCount);	
			}
			else if(errorCount>0 && errorCount<=5){
				const choices= ['Suspicious','Hmmmm','stares in sus','What\'s Cookin?','Sus'];
				const mood = choices[Math.floor(Math.random()*choices.length)];
				// panel.title = mood;
				panel.html= getWebviewContent(mood, errorCount);	
			}
			else if(errorCount>5 && errorCount<=10){
				const choices= ['Thak gaya hu bro','Kakj','Life is Sad','Ok'];
				const mood = choices[Math.floor(Math.random()*choices.length)];
				// panel.title = mood;
				panel.html= getWebviewContent(mood, errorCount);	
			}
			else if(errorCount>10){
				const choices= ['Paaaainnnn','Noo God Noo!','This is the Worst','Livin the Life!','Whaat?'];
				const mood = choices[Math.floor(Math.random()*choices.length)];
				// panel.title = mood;
				panel.html= getWebviewContent(mood, errorCount);	
			}
		};

		//function to set/return the html file to be displayed in the webview
		function getWebviewContent(mood, errorCount) {
			return `<!DOCTYPE html>
		  <html lang="en">
		  <head>
			  <meta charset="UTF-8">
			  <meta name="viewport" content="width=device-width, initial-scale=1.0">
			  <title>mood Coding</title>
		  </head>
		  <body>
			  <img src="${moods[mood]}" width="500" />
			  <h3>Errors: ${errorCount}</h3>
		  </body>
		  </html>`;
		  
		}

		//check which is the currently active editor
		let uri = null;

		// Listen for changes in the active editor
		vscode.window.onDidChangeActiveTextEditor(editor => {
			if (editor) {
				// Update the URI
				uri = editor.document.uri;
				// console.log(`The URI of the active editor is now: ${uri.toString()}`);

				//if no new changes in diagnostics, but active editor does change,
				//still need to update webview, to show details about currently active uri
				const currentDiagnostics= vscode.languages.getDiagnostics(uri);
				// console.log('new report:');
				// console.log(initialDiagnostics);
				
				let csum= 0;
				for(let i=0; i<currentDiagnostics.length; i++){
					if(currentDiagnostics[i].severity==0)
						csum++;
					// isum= isum+initialDiagnostics[i][1].length;
				}
				// console.log('Total errors in all open editors: '+isum);
				let errorCount= csum;
				updateWebview(errorCount);
			}
		});

		// Initial URI setup
		const initialEditor = vscode.window.activeTextEditor;
		if (initialEditor) {
			uri = initialEditor.document.uri;
			// console.log(`The URI of the initial active editor is: ${uri.toString()}`);
		}

		//initial display
		const initialDiagnostics= vscode.languages.getDiagnostics(uri);
		// console.log('new report:');
		// console.log(initialDiagnostics);
		
		let isum= 0;
		for(let i=0; i<initialDiagnostics.length; i++){
			if(initialDiagnostics[i].severity==0)
				isum++;
			// isum= isum+initialDiagnostics[i][1].length;
		}
		// console.log('Total errors in all open editors: '+isum);
		let errorCount= isum;
		updateWebview(errorCount);

		//updating diagnostics whenever there's a change
		vscode.languages.onDidChangeDiagnostics(()=>{
			const allDiagnostics= vscode.languages.getDiagnostics(uri);
			// console.log('new report:');
			// console.log(allDiagnostics);
			
			let sum= 0;
			for(let i=0; i<allDiagnostics.length; i++){
				if(allDiagnostics[i].severity==0)
					sum++;
			}
			// console.log('Total errors in all open editors: '+sum);
			let errorCount= sum;
			updateWebview(errorCount);
		})
	}
  }

function activate(context) {

	let disposable = vscode.commands.registerCommand('moody--your-vibe-partner.moody', function () {
		vscode.window.showInformationMessage('Hi I\'m Moody!');
	});

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('moody-view', new MyWebviewViewProvider(context))
	  );
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
