Feature: Open Bing with different browsers
	
@Bing
Scenario Outline: Open Bing
	Given Go to Bing with <browser>
	Examples:
	  | browser 			 |
	  | Chrome  			 |
	  | MicrosoftEdge        |
	
	