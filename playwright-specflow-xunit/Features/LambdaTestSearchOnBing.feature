Feature: Go to Bing with different browsers

@Bing
Scenario Outline: Open Bing
	Given Set <browser> as a capability
	Then Go to Bing
	Examples:
	  | browser 			 |
	  | Chrome  			 |
	  | MicrosoftEdge        |