import { extractMarkdown, getLargestContent } from "@/utils/article";
import { expect, test, describe, mock, afterEach } from "bun:test";
import { mockFetch } from '../helpers';
import { Window } from 'happy-dom';

const htmlRes = `<!DOCTYPE html><html><head><link href="/third-party/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css"><link href="/style.css" rel="stylesheet" type="text/css"><title>Learn Datalog Today!</title></head><body><div id="container" class="container"><div class="row"><div class="offset2 span8"><div id="textcontent"><h1>Learn Datalog Today</h1><p><strong>Learn Datalog Today</strong> is an interactive tutorial designed to teach you the <a href='https://datomic.com'>Datomic</a> dialect of <a href='https://en.wikipedia.org/wiki/Datalog'>Datalog</a>. Datalog is a declarative <strong>database query language</strong> with roots in logic programming. Datalog has similar expressive power as <a href='https://en.wikipedia.org/wiki/Sql'>SQL</a>.</p><p>Datomic is a database with an interesting and novel architecture, giving its users a unique set of features. You can read more about Datomic at <a href='http://datomic.com'>https://datomic.com</a> and the architecture is described in some detail <a href='https://www.infoq.com/articles/Architecture-Datomic'>in this InfoQ article</a>.</p><h2>Table of Contents</h2><ul><li><a href='/chapter/0'>Extensible Data Notation</a></li><li><a href='/chapter/1'>Basic Queries</a></li><li><a href='/chapter/2'>Data Patterns</a></li><li><a href='/chapter/3'>Parameterized Queries</a></li><li><a href='/chapter/4'>More Queries</a></li><li><a href='/chapter/5'>Predicates</a></li><li><a href='/chapter/6'>Transformation Functions</a></li><li><a href='/chapter/7'>Aggregates</a></li><li><a href='/chapter/8'>Rules</a></li></ul><p>This tutorial was written on rainy days for the <a href='http://lispinsummerprojects.org'>Lisp In Summer Projects</a> 2013. If you find bugs, or have suggestions on how to improve the tutorial, please visit the project on <a href='https://github.com/jonase/learndatalogtoday'>github</a>.</p><p>Many thanks to <a href='https://twitter.com/RobStuttaford'>Robert Stuttaford</a> for his careful proof reading/editing. I'd also like to thank everyone who has <a href='https://github.com/jonase/learndatalogtoday/graphs/contributors'>contributed</a> by fixing bugs and spelling mistakes.</p><p>If you learn datalog today, you can consider <a href='https://github.com/sponsors/jonase'>sponsoring</a> the maintenance and running costs of this website.</p></div></div></div><div class="row"><div class="offset2 span8"><footer class="text-center" style="border-top: 1px solid lightgrey; margin-top: 40px;padding:10px;"><small><p><a href="https://www.learndatalogtoday.org">www.learndatalogtoday.org</a> &copy; 2013 - 2023 Jonas Enlund</p><p><a href="https://github.com/jonase/learndatalogtoday">github</a> | <a href="http://lispinsummerprojects.org/">lispinsummerprojects.org</a></p></small></footer></div></div></div><script src="/third-party/jquery/jquery-1.10.1.min.js" type="text/javascript"></script><script src="/third-party/bootstrap/js/bootstrap.js" type="text/javascript"></script></body></html>`;
const window = new Window({ url: 'https://localhost:8080' });

describe('article', () => {
    describe('extractMarkdown', () => {
        afterEach(() => {
            mock.restore();           
        });

        test('fetch content of passed url', async () => {
            mockFetch({
                'https://www.learndatalogtoday.org/': htmlRes
            });

            const res = await extractMarkdown('https://www.learndatalogtoday.org/');
            expect(res).toBe(`# Learn Datalog Today\n\n**Learn Datalog Today** is an interactive tutorial designed to teach you the [Datomic](https://datomic.com) dialect of [Datalog](https://en.wikipedia.org/wiki/Datalog). Datalog is a declarative **database query language** with roots in logic programming. Datalog has similar expressive power as [SQL](https://en.wikipedia.org/wiki/Sql).\n\nDatomic is a database with an interesting and novel architecture, giving its users a unique set of features. You can read more about Datomic at [https://datomic.com](http://datomic.com) and the architecture is described in some detail [in this InfoQ article](https://www.infoq.com/articles/Architecture-Datomic).\n\n## Table of Contents\n\n* [Extensible Data Notation](/chapter/0)\n* [Basic Queries](/chapter/1)\n* [Data Patterns](/chapter/2)\n* [Parameterized Queries](/chapter/3)\n* [More Queries](/chapter/4)\n* [Predicates](/chapter/5)\n* [Transformation Functions](/chapter/6)\n* [Aggregates](/chapter/7)\n* [Rules](/chapter/8)\n\nThis tutorial was written on rainy days for the [Lisp In Summer Projects](http://lispinsummerprojects.org) 2013\\. If you find bugs, or have suggestions on how to improve the tutorial, please visit the project on [github](https://github.com/jonase/learndatalogtoday).\n\nMany thanks to [Robert Stuttaford](https://twitter.com/RobStuttaford) for his careful proof reading/editing. I'd also like to thank everyone who has [contributed](https://github.com/jonase/learndatalogtoday/graphs/contributors) by fixing bugs and spelling mistakes.\n\nIf you learn datalog today, you can consider [sponsoring](https://github.com/sponsors/jonase) the maintenance and running costs of this website.`)
        });
    });

    describe('getLargestContent', () => {
        test('output the content largest content on an HTMLCollection that is not an IFRAME or SCRIPT', () => {
            window.document.write(htmlRes);
            const res = getLargestContent(window.document.body.children);
            const correctValue = window.document.querySelector('#container');
            expect(res.id).toEqual(correctValue.id);
            expect(res.tagName).not.toBe('IFRAME');
            expect(res.tagName).not.toBe('SCRIPT');
        });
    });
});