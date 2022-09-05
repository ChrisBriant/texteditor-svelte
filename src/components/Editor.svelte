<script>
    import { onDestroy } from "svelte";
    import { textStoreActions } from '../store/textstore';

    let inputText = 'Hello here is some textHere is a header';
    let formattedText = `<p>Hello here is some text</p><h1>Here is a header</h1>`;
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

    const totalStrings = (strArray) => {
        let total = 0;
        strArray.forEach(element => {
            total += element.length;
        });
        return total;
    } 

    const getPosWithoutTags = (plainText,taggedText,pos) => {
        let newPos = pos;
        const matches = taggedText.match(/<(?<=).(?=)[\w]*>/gm);
        let removedTags = [];
        let compareString = taggedText;
        //let compareString = formattedText;
        //const targetText = inputText.substring(0,pos);
        //console.log('GET START POS', matches,targetText,compareString);
        //console.log(compareString.startsWith(targetText));
        for(let i=0;i<matches.length;i++) {
            if(compareString.startsWith(plainText)) {
                break;
            }
            const removeTagSt = compareString.indexOf(matches[i]);
            removedTags.push(matches[i]);
            const firstHalfOfString = compareString.substring(0,removeTagSt);
            const endHalfOfString = compareString.substring(removeTagSt + matches[i].length, compareString.length);
            compareString = firstHalfOfString + endHalfOfString;
            //compareString = compareString.substring(0,removeTagSt) + compareString.substring(removeTagSt.length, compareString.length);
        }
        newPos += totalStrings(removedTags);
        //console.log('COMPARE STRING', compareString, removedTags,pos, newPos);
        return newPos;
    }

    const handleTyping = (e) => {
        console.log(e.key);
        if(e.key === 'Delete') {
            e.preventDefault();
            console.log(e.target.selectionStart, e.target.selectionEnd);
            const endOfFirstHalf =  getPosWithoutTags(inputText.substring(0,e.target.selectionStart),formattedText,e.target.selectionStart);
            const firstHalf = formattedText.substring(0,endOfFirstHalf);
            const middleToEnd = formattedText.substring(firstHalf.length,formattedText.length);
            const inputStrMiddle = inputText.substring(e.target.selectionStart, e.target.selectionEnd);
            const endOfMiddle =  getPosWithoutTags(inputStrMiddle,middleToEnd,e.target.selectionEnd -e.target.selectionStart );
            const endHalf = formattedText.substring(firstHalf.length + endOfMiddle,formattedText.length);
            //const endHalf = formattedText.substring(firstHalf.length + (middle.length - 1),formattedText.length);
            console.log('STRINGS');
            console.log('firsthalf',firstHalf);
            console.log('end half', endHalf);
            console.log('Middle of Input', inputStrMiddle);
            console.log('Middle to End', middleToEnd, endOfMiddle);
        }

        if(e.key === 'Backspace') {
            const match = formattedText.match(/<\/?[\w]*>$/g);
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