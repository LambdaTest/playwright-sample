Feature: Go to Google with different browsers

@Google
Scenario Outline: Open Google
	Given Set <browser> as a capability
	Then Go to Google
	Examples:
	  | browser 			 |
	  | Chrome  			 |
	  | MicrosoftEdge        |