<script>
    import { textStoreActions } from '../store/textstore';

    $: console.log('IN DISPLAY', $textStoreActions.formattedText);
</script>

<style>
    .target-text {
        background-color: #aaa;
        height: 300px;
        width: 300px;
        overflow-y: scroll;
    }
</style>

<div class="target-text">
    <pre>{$textStoreActions.formattedText}</pre>
</div>