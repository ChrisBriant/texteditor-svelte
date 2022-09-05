<script>
    import { textStoreActions } from '../store/textstore';
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
    {@html $textStoreActions.formattedText}
</div>