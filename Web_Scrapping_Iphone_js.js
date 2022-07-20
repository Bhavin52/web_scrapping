{
  "nbformat": 4,
  "nbformat_minor": 0,
  "metadata": {
    "colab": {
      "name": "Web_Scrapping_Iphone.js",
      "provenance": [],
      "collapsed_sections": [],
      "authorship_tag": "ABX9TyODGcxePqFo1P7r48n/w9X4",
      "include_colab_link": true
    },
    "kernelspec": {
      "name": "python3",
      "display_name": "Python 3"
    },
    "language_info": {
      "name": "python"
    }
  },
  "cells": [
    {
      "cell_type": "markdown",
      "metadata": {
        "id": "view-in-github",
        "colab_type": "text"
      },
      "source": [
        "<a href=\"https://colab.research.google.com/github/Bhavin52/web_scrapping/blob/main/Web_Scrapping_Iphone_js.js\" target=\"_parent\"><img src=\"https://colab.research.google.com/assets/colab-badge.svg\" alt=\"Open In Colab\"/></a>"
      ]
    },
    {
      "cell_type": "code",
      "execution_count": null,
      "metadata": {
        "id": "K2R_VFuzfCZf"
      },
      "outputs": [],
      "source": [
        "const  fs  = require('fs');\n",
        "const puppeteer = require('puppeteer');\n",
        "\n",
        "(async () => {\n",
        "    const browser = await puppeteer.launch({\n",
        "        headless: false\n",
        "    });\n",
        "    const page = await browser.newPage();\n",
        "    var pageNo = 100;\n",
        "    for (i = 1; i < pageNo; i++) {\n",
        "        await page.goto(`https://www.flipkart.com/apple-iphone-12-green-128-gb/product-reviews/itm4e0a120f7d9c4?pid=MOBFWBYZQXUEHF48&lid=LSTMOBFWBYZQXUEHF484WD4A9&marketplace=FLIPKART&page=${i}`, {\n",
        "            waitUntil: 'load',\n",
        "        });\n",
        "        await page.waitForSelector('#container > div > div._2tsNFb > div > div > div._1YokD2._3Mn1Gg.col-9-12')\n",
        "        var data = await page.evaluate(() => {\n",
        "            var toExpand = document.querySelectorAll('[class=\"_1BWGvX\"]')\n",
        "            if (toExpand.length != 0) {\n",
        "                const sleep = (milliseconds) => {\n",
        "                    return new Promise(resolve => setTimeout(resolve, milliseconds))\n",
        "                }\n",
        "                const getReviews = async () => {\n",
        "                    for (elem of toExpand) {\n",
        "                        await sleep(50)\n",
        "                        elem.click()\n",
        "                    }\n",
        "                    return Array.from(document.querySelectorAll('[class=\"t-ZTKy\"]'), x => x.innerText)\n",
        "                }\n",
        "                var reviews = getReviews().then(A => A)\n",
        "            } else {\n",
        "                var reviews = Array.from(document.querySelectorAll('[class=\"t-ZTKy\"]'), x => x.innerText)\n",
        "            }\n",
        "            return reviews\n",
        "        })\n",
        "        console.log(data)\n",
        "        data.forEach(A => {\n",
        "            fs.appendFileSync('./iphone_12_reviews.txt',A+'\\n======================================================================================================================================================\\n')\n",
        "        })\n",
        "    }\n",
        "    await browser.close();\n",
        "})();"
      ]
    }
  ]
}