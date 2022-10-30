<template>
	<div class="container">
		<div class="event-card">
			<h4>{{ event ? event.name : "" }}</h4>
			<div class="status">
				<span
					:class="
						statusColor == 'Unknow'
							? ''
							: statusColor == 'Alive'
							? 'statusGreen'
							: 'statusRed'
					"
				></span>
				<span>Status: {{ event ? event.status : "" }}</span>
			</div>
			<img :src="event ? event.image : ''" />
			<nav class="nav-details">
				<router-link :to="{ name: 'EventDetails' }"
					>Details</router-link
				>
				|
				<router-link :to="{ name: 'EventLocation' }"
					>Location</router-link
				>
			</nav>
			<router-view :event="event" />
		</div>
		<div class="episode-div">
			<h2>List of Episode</h2>
			<div class="card">
			
				<ul>
					<li v-for="(i , index) in episode" :key="index">
						{{i}}
					</li>
				</ul>
			</div>
		</div>
		<div class="comment-box">
			Comments:
			<ul>
				<li v-for="(i , index) in listcomments" :key="index"> 
					{{i.name}}:{{i.comment}}
				</li>
			</ul>
			<form class="form" v-on:submit="Submit">
				<label>Username:</label>
				<input type="text" placeholder="user name" v-model="c_name"/> <br/>
				<label>Comment:</label>
				<input type="text" placeholder="Comments" v-model="comment"/>
				<button type="submit">Submit</button>
			</form>
		</div>
	</div>
</template>
<script>
import Service from "@/services/service.js";
export default {
	props: ["id"],
	data() {
		return {
			event: null,
			statusColor: null,
			name : null,
			status : null,
			episode:null,
			epi : null,
			listcomments : null,
			c_name:'',
			comment:'',

		};
	},
	created() {
		Service.getEvent(this.id)
			.then((response) => {
				this.event = response.data;
				this.statusColor = this.event.status;
				this.name = this.event.name;
				this.status = this.event.status;
				// this.episode = this.event.episode;
				// console.log(this.event.episode);
				Service.getEpisode(this.name , this.status)
					.then((response)=>{

						this.episode = response.data.results[0].episode
						this.epi = this.episode.map((i)=>{return <li>{{i}}</li> })
						console.log(Array(this.epi))
					})
					.catch((error) => {
						console.log(error)
					})
			})
			.catch((error) => {
				console.log(error);

				this.$router.push({
					name: "404Resource",
					params: { resource: "event" }
				});
			});
		
		Service.getComments(this.id)
		.then((response) => {
				
				console.log(response.data);
				this.listcomments = response.data.data 
				
			})
			.catch((error) => {
				console.log(error);

				this.$router.push({
					name: "404Resource",
					params: { resource: "event" }
				});
			});
		
		
	},
	methods : {
		GetComment: function(){
			Service.getComments(this.id)
		.then((response) => {
				
				console.log(response.data);
				this.listcomments = response.data.data 
				
			})
			.catch((error) => {
				console.log(error);

				this.$router.push({
					name: "404Resource",
					params: { resource: "event" }
				});
			});
		
		},
		Submit: function(event){
			event.preventDefault()
			let formdata = {
				name:this.c_name,
				comment:this.comment,
				char_id:this.id,
			}
			Service.postComment(formdata)
				.then((response)=>{
					console.log(response)
					alert(response.data.msg)
					this.GetComment()
					this.c_name = ""
					this.comment = ""
				})
			// console.log(this.c_name , this.comment);
		}
	}
	
};
</script>

<style scope>
.event-card {
}
.statusGreen,
.statusRed {
	margin: auto 0;
	height: 0.5rem;
	width: 0.5rem;
	margin-right: 0.375rem;
	background: rgb(214, 61, 46);
	border-radius: 50%;
}
.statusGreen {
	background: rgb(92 199 12);
}
</style>
