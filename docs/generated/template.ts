export default `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ETOH Proxy API Documentation</title>
  <style>
    {{styles}}
  </style>
</head>
<body class="dark-theme">
  <h1 class="header-row">Roblox Proxy API Documentation</h1>
	<label class="menu-toggle">
    <input type="checkbox">
    <div class="hamburger-container">
		  <div class="hamburger">
		    <span></span>
		    <span></span>
		    <span></span>
		  </div>
		  <h3>Navigation</h3>
    </div>
	  <nav class="sidebar">
	    <div class="nav-content">
	      <ul>
	        <li><a href="#introduction">Introduction</a></li>
	        <li>
	          <a href="#endpoints">Endpoints</a>
	          <ul class="endpoint-nav">
	              {{endpoint-nav}}
	          </ul>
	        </li>
	      </ul>
	    </div>
	  </nav>
	</label>

  <main class="content">
    <div class="container">

      <section id="introduction">
        <p>A Proxy for roblox data. Modifies the data retrieved from roblox slightly before returning said data</p>
        <div>CORS has been "bypassed" allowing from any domain, if this gets abused i will limit it to only my domains though</div>
      </section>

      <section id="endpoints">
        <h2>Endpoints</h2>
        Note: If an endpoint has multiple status codes, that means any of them could be returned. Although they will be mostly the same, there is still a small difference.
        {{endpoints}}
      </section>
    </div>
  </main>
</body>
</html>
`;