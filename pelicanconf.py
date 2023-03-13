"""Primary configuration"""
AUTHOR = 'dr_a'
SITENAME = 'All Knowing Trash Heap'
SITEURL = ''
STATIC_PATHS = ['images', 'extra/CNAME', 'webring']
EXTRA_PATH_METADATA = {'extra/CNAME': {'path': 'CNAME'},
                       }
THEME = 'elegant'
PATH = 'content'

TIMEZONE = 'America/Los_Angeles'

DEFAULT_LANG = 'en'

LANDING_PAGE_TITLE = "All Knowing Trash Heap"

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('The web ring CSS file', '/webring/swirl.css'),
         ('The web ring Javascript file', '/webring/webring.js'),
         )

# Social widget
SOCIAL = (('<a rel="me" href="https://mastodon.social/@dr_a">dr_a@mastodon.social</a>', '#'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

SITESUBTITLE = """
<webring-swirl site="https://ring.allknowingtrashheap.art/"
     ringlist="/webring/sitelist.json" theme="low-profile">
     Make sure the <pre>webring.js</pre> script is loaded.</webring-swirl>
    <script type="text/javascript"
    src="/webring/webring.js"></script>
"""