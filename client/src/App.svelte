<script>
	import Header from "./components/Header.svelte"; 
	import Sidebar from "./components/Sidebar.svelte";
	import Content from "./components/Content.svelte";
</script>

<main>
	<Header/>
	<div class="content">

		<Sidebar/>
		<Content/>
	
	</div>

</main>

<style>
	.content {
		display: grid;
		grid-template-areas: 'sidebar main-content main-content main-content main-content';
		gap: 16px;
		height: calc(100vh - 108px);
		margin-top: 20px;
	}
</style>