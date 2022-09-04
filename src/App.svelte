<script>
	import Editor from "./components/Editor.svelte";
	import DisplayUnformatted from "./components/DisplayUnformatted.svelte";

	export let name;
</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.components-container {
		display: flex;
		flex-direction: row;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<main>
	<section>
		<h1>Hello {name}!</h1>
		<div class="components-container">
			<Editor />
			<DisplayUnformatted />
		</div>
	</section>
</main>

