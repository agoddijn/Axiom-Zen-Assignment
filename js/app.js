(function(){
	var app = angular.module('news', []);

	app.controller('NewsController', function(){
		this.articles = articles;
		this.toSubmit = {};

		/*$http.get('test.json').success(function(data){
			newsTemp.articles = data;
			alert("data import succeeded");
		}).error(function(data){
			alert("data import failed");
		});

		this.updateData = function(){
			$http.put('test.json', newsTemp.articles).success(function(data){
				alert("json file updated");
			}).error(function(data){
				alert("json file failed to update: "+newsTemp.articles);
			});
		}*/

		this.saveArticle = function(){
			this.articles.push(new article(this.toSubmit.articleTitle, this.toSubmit.url));
			this.calculatePoints();
			this.toSubmit = {};
		};

		this.upvote = function(article){
			article.votes += 1;
			this.calculatePoints();
		};

		this.calculatePoints = function(){
			for(var i = 0; i < this.articles.length; i++){
				var curArticle = this.articles[i];
				var curDate = new Date();
				var timePassedHours = (curDate.getTime() - curArticle.posted.getTime())/(1000*3600);
				var timePassedSeconds = timePassedHours * 3600; /*you can set it to seconds to speed up the response of the algorithm for testing*/
				curArticle.points =  curArticle.votes / Math.pow(timePassedHours+2,1.8); /*same ranking algorithm as hacker news*/
			}
		};
	});

	app.filter('urlFormat', function(){
		return function(input){
			var startAt = 0;
			var endAt = 0;
				for(var i = 0; i<input.length; i++){
					if(input.charAt(i) === '/' && input.charAt(i+1) === '/'){
						startAt = i+2;
					}
					else if(input.charAt(i) === '/' && input.charAt(i-1) !== '/'){
 						endAt = i;
 						break;
					}
					else if(i === input.length-1)
						endAt = i+1;
				}
			return input.substring(startAt, endAt);
		}
	});

	var article = function(articleTitle, url){
		this.articleTitle = articleTitle;
		this.url = url;
		this.votes = 0;
		this.points = 0;
		this.posted = new Date();
	};

	var articles = [
		new article('Example Article Title', 'https://www.google.co.uk/?gws_rd=ssl'),
		new article('Redbull Rampage 2014 winning run', 'http://www.redbull.com/ca/en/bike/stories/1331681802659/red-bull-rampage-2014-finals-results-report-and-video'),
		new article('Volvo Ocean race start highlights', 'http://www.volvooceanrace.com/en/video/28108_Leg-1-start-highlights.html'),
		new article('Hacker News', 'https://news.ycombinator.com')
	];

})();


