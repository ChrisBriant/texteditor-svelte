<script>
    import { onDestroy } from "svelte";
    import { textStoreActions } from '../store/textstore';

    let inputText = '';
    let formattedText = '';
    let mode = 'plain';
    let currentTag = '<p>';
    let startedParagraph = false;
    

    const unsubscribe = textStoreActions.subscribe(() => {});

    onDestroy(() => {
        unsubscribe();
	});

    // $: console.log('input text', inputText);
    // $: console.log('formatted text', formattedText);
    $: textStoreActions.setFormattedText(formattedText);
    // $: console.log('STORE', $textStoreActions);

    const appendAlphaNumericCharacter = (char) => {
        if(char.length === 1 && char.match(/[A-Z,a-z,0-9,!,",£,$,%,&,\*," "]/)) {
            formattedText += char;
        }
    }

    const handleTyping = (e) => {
        console.log(e.key);
        if(e.key === 'Backspace') {
            //if(formattedText === '') {return;}
            // const lastChar = formattedText[formattedText.length-1];
            // if(lastChar !== '>') {
            //     formattedText = formattedText.substring(0, formattedText.length - 1);
            // } else {
                const match = formattedText.match(/<\/?[\w]*>$/gm)
                if(match) {
                    const endTag = match[0];
                    formattedText = formattedText.substring(0,formattedText.length-endTag.length);
                    if(endTag.includes('/')) {
                        startedParagraph = true;
                    } else {
                        startedParagraph = false;
                    }
                } else {
                    formattedText = formattedText.substring(0, formattedText.length - 1);
                }
                // const matches = formattedText.match(/(?<=<).*?(?=>)/gm);
                // const noCharsToRemove = matches[matches.length -1].length + 2;
                // formattedText = formattedText.substring(0, formattedText.length - noCharsToRemove);
                // console.log('MATCHES', matches[matches.length -1]);
                // //Check start tag and set to started typing    
                // if(!matches[matches.length -1].match('/')) {
                //     startedParagraph = true;
                // }
                // //Check not closing tag in remaining string
                // const newLastChar = formattedText[formattedText.length-1];
                // if(newLastChar === '>') {
                //     console.log('LAST TAG', formattedText.match(/<\/[\w]*>$/gm))
                //     startedParagraph = false;
                // } 
            //}
            return;
        }

        if(!startedParagraph) {
            formattedText += currentTag;
            startedParagraph = true;
        }



        //Check for new line
        if(e.key === 'Enter') {
            let endTag = '</' + currentTag.split('<')[1];
            formattedText += endTag;
            startedParagraph = false;
        }
        //Check alpha numeric
        appendAlphaNumericCharacter(e.key); 
        // switch (mode) {
        //     case 'plain':
        //         currentTag = 'p';
        //         break;
        //     default:
        //         currentTag = 'p';
        //         break;
        // }


    }

</script>

<style>
    textarea {
        border: 1px #000 solid;
    }
</style>

<div class="editor-container">
    <textarea name="main-edit" id="" cols="30" rows="10" bind:value={inputText} on:keydown={(e) => handleTyping(e)}/>
</div>