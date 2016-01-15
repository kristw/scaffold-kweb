# scaffold web

Making this for myself when I need to create a new site

## Usage

### Run

To run in development mode

```
gulp
```

See you site at [localhost:7000](http://localhost:7000). It will automagically refresh when you change the code (via browsersync).

To run in production mode

```
gulp --production
```

### Test

Run this command to test once.

```
gulp test
```

Or run this command to test and retest when files are changed.

```
gulp tdd
```

Test coverage will be generated to ```coverage``` directory.

## Technology

- Package Management: npm, bower
- CSS: sass
- JS: Webpack, Babel
- Development: Browsersync
- Test: Karma, Jasmine, Istanbul
- Misc: imagemin, htmlmin, ngtemplates
- (Optional): Can use a built-in static server, or change slightly to use node.js express.

## License

Copyright 2015 Krist Wongsuphasawat

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
