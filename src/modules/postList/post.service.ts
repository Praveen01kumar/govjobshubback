/* eslint-disable prettier/prettier */

import { Injectable, Inject } from '@nestjs/common';
import { POST_LIST_TABLE } from 'src/constants';
import { PostList } from './post.table';
import { PostListDto } from './post.dto';
const siteUrl: string = 'https://www.sarkariresult.com';
import * as puppeteer from 'puppeteer';
import { PostData } from '../postData/postdata.table';

@Injectable()
export class PostListService {

    constructor(@Inject(POST_LIST_TABLE) private readonly postlistTable: typeof PostList) { }

    async create(post: PostListDto): Promise<PostList> {
        return await this.postlistTable.create<PostList>(post);
    }

    async deleteAll(): Promise<void> {
        await this.postlistTable.destroy({ where: {} });
      }

    async findAll(): Promise<PostList[]> {
        return await this.postlistTable.findAll<PostList>({
            include: [
                { model: PostData, attributes: { exclude: ['data_link'] } }],
                attributes: { exclude: ['post_link'] }
        });
    }

    async getResults(): Promise<any> {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        try {
            await page.goto(siteUrl, { waitUntil: 'load', timeout: 60000 });
            await page.waitForSelector('.center-tables', { visible: true });
            const extractedHTML = await page.evaluate(() => {
                const headings = Array.from(document.querySelectorAll('.center-tables div table tbody tr td #heading'));
                const posts = Array.from(document.querySelectorAll('.center-tables div table tbody tr td #post'));
                return headings.map((section, index) => {
                    const post_name = section.querySelector('#heading div a')?.textContent.trim();
                    const post_link = section.querySelector('#heading div a')?.getAttribute('href');
                    const data = Array.from(posts.at(index).querySelectorAll('ul li')).map((el) => ({ name: el?.querySelector('a').textContent.trim(), link: el?.querySelector('a').getAttribute('href') }));
                    return { post_name, post_link, data };
                });
            });
            if (!extractedHTML) {
                throw new Error('Desired HTML element not found for post list on the page');
            }
            return extractedHTML;
        } catch (error) {
            throw new Error('Failed to fetch post list data!');
        } finally {
            await browser.close();
        }
    }

    async getDetail(url: string) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        try {
            await page.goto(url, { waitUntil: 'load', timeout: 60000 });
            await page.waitForSelector('table', { visible: true });
            const extractedHTML = await page.evaluate(() => {
                const tables = document.querySelectorAll('table tbody tr td div table');
                const tablesHTML = Array.from(tables).map(table => table.outerHTML);
                return tablesHTML.join('\n');
            });
            if (!extractedHTML) {
                throw new Error('Desired HTML element for detail data not found on the page');
            }
            return extractedHTML;
        } catch (error) {
            throw new Error('Failed to fetch detail data!');
        } finally {
            await browser.close();
        }
    }

}