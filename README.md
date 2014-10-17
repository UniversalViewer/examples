player-examples
===============

The player-examples repo has 'master' and 'wellcome' branches.

These are monitored by http://player-examples.azurewebsites.net and http://wellcomeplayer-examples.azurewebsites.net/ respectively.

Before running the `examples` task to copy the build to the examples folder, make sure that both the player and examples repos are both on the same branch name.

examples.js detects whether you're viewing the examples locally or on the demo site and uses the src or built files accordingly.