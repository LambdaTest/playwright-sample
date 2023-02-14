Feature: Go to Bing with different browsers

@Bing
Scenario Outline: Open Bing
	Given Set <browser> as a capability
	Then Go to Bing
	@chrome
	Examples:
	  | browser 			 |
	  | Chrome  			 |

	@edge
	Examples:
	  | browser 			 |
	  | MicrosoftEdge        |