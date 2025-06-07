export const endpoints_endpoint_deprecated = `<div class="deprecated">
	<bold>Deprecated</bold> as of <code>v{{deprecated_version}}</code><br>
	Use <code>{{deprecated_use}}</code> instead
</div>
`;
export const endpoints_endpoint_parameter = `<tr>
  <td><p>{{name}}{{required}}</p>
  	<code style="color: gray">{{type}}</code>
  </td>
  <td>{{description}}
  	{{notes}}
  </td>
</tr>
`;
export const endpoints_endpoint_response_model_sub = `<tr>
  <td>{{field}}
  	<code>{{type}}</code>
  </td>
  <td>{{description}}</td>
</tr>
`;
export const endpoints_endpoint_response_model = `<div class="response-model">
  <h5>Model</h5>
  <table>
    <thead>
      <tr>
        <th>Field</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
    	{{model-sub}}
    </tbody>
  </table>
</div>
`;
export const endpoints_endpoint_response = `<tr class="response">
  <td class="status-code">{{code}}</td>
  <td class="status-text">{{description}}
	  {{model}}
  </td>
</tr>
`;
export const endpoints_endpoint = `<div class="endpoint" id="{{id}}">
  <div class="endpoint-header">
    <input type="checkbox" id="toggle-{{id}}" class="endpoint-toggle">
    <label for="toggle-{{id}}" class="endpoint-toggle-button">
      <span class="method {{method_l}}">{{method}}</span>
      <div class="endpoint-info">
        <code class="path">{{path}}</code>
        <p class="description">{{description}}</p>
      </div>
      {{deprecated}}
      <span class="expand-icon">&#x25BC;</span>
      <span class="collapse-icon">&#x25B2;</span>
    </label>
	  <div class="endpoint-content">
	    <div class="parameters">
	      <h4>Parameters</h4>
	      <table>
	        <thead>
	          <tr>
	            <th>Name</th>
	            <th>Description</th>
	          </tr>
	        </thead>
	        <tbody>
	          {{parameters}}
	        </tbody>
	      </table>
	    </div>
	    <div class="responses">
	      <h4>Responses</h4>
				<table>
					<thead>
						<tr>
							<th>Code</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{{responses}}
					</tbody>
				</table>
	    </div>
	  </div>
	</div>
</div>
`;
export const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Roblox Proxy API Documentation</title>
  <style>
    {{styles}}
  </style>
</head>
<body class="dark-theme">
  <h1 class="header-row">Roblox Proxy API Documentation
  </h1>
  <div class="github">
		<a href="https://github.com/dragmine149/roblox-proxy" title="The github repo">
			<img src="https://img.icons8.com/?size=100&id=106564&format=png&color=000000">
		</a>
  </div>
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
					<li>
	          <a href="#updates">Updates</a>
	          <ul class="update-nav">
	              {{update-nav}}
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
        Information:
        <ul>
        	<li>Endpoints with multiple status codes could mean any of those is returned. The format should be the same in most cases but can be slightly different.</li>
         	<li>Endpoints that are formatted like <code>{A|B}</code> means that it could be A or B for that parameter. This is only really used upon merging of two old endpoints and will rarley be used.</li>
        </ul>
        {{endpoints}}
      </section>

      <section id="updates">
	      <h2>Updates</h2>
	      All of the updates to this proxy will be listed here.
				{{updates}}
      </section>

    </div>
  </main>
</body>
</html>
`;
export const updates_update = `<div class="updates" id="updates-{{update_id}}">
	<div class="update-header">
    <input type="checkbox" id="toggle-{{update_id}}" class="update-toggle" autocomplete="off">
    <label for="toggle-{{update_id}}" class="update-toggle-button">
      <span class="update">{{update_version}} - <code>{{update_date}} {{update_time}}</code></span>
      <span class="expand-icon">&#x25BC;</span>
      <span class="collapse-icon">&#x25B2;</span>
    </label>
    <div class="update-content">
     	{{update_description}}
      <div update="breaking">{{update_breaking}}</div>
      <div update="added">{{update_added}}</div>
      <div update="changed">{{update_changed}}</div>
      <div update="fixed">{{update_fixed}}</div>
      <div update="removed">{{update_removed}}</div>
    </div>
	</div>
</div>
`;