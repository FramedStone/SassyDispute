import { Hono } from 'hono'

const app = new Hono()

app.get('/get-data', (c) => {
  return c.json({
    data: [
        {
          "id": "1",
          "title": "Dispute over Product XYZ",
          "description": "Buyer claims the product received is defective, while the seller asserts that the product was shipped in perfect condition.",
          "creator": "john doe",
          "is_archived": false,
          "created_at": "09:08:06",
          "comments": [
            {
              "id": "1",
              "creator": "Tharshen",
              "role": "buyer",
              "comment": "The product I received is completely broken, and it doesn't work at all.",
              "created_at": "09:08:06"
            },
            {
              "id": "2",
              "creator": "john doe",
              "role": "seller",
              "comment": "I shipped the product in perfect condition. You must have damaged it after receiving it.",
              "created_at": "09:10:00"
            },
            {
              "id": "3",
              "creator": "Tharshen",
              "role": "buyer",
              "comment": "That's not true! It was broken right out of the box. I need a refund or a replacement.",
              "created_at": "09:12:30"
            },
            {
              "id": "4",
              "creator": "john doe",
              "role": "seller",
              "comment": "Sorry, but I have proof from the courier that the package was intact when it was delivered.",
              "created_at": "09:14:45"
            },
            {
              "id": "5",
              "creator": "Tharshen",
              "role": "buyer",
              "comment": "That doesn't mean the product wasn't defective when you sent it. I can send photos of the damage.",
              "created_at": "09:16:00"
            },
            {
              "id": "6",
              "creator": "john doe",
              "role": "seller",
              "comment": "Please send the photos, and I will assess the situation.",
              "created_at": "09:18:20"
            },
            {
              "id": "7",
              "creator": "Tharshen",
              "role": "buyer",
              "comment": "Photos sent. Check your messages. (img) (img)",
              "created_at": "09:20:00"
            },
            {
              "id": "8",
              "creator": "john doe",
              "role": "seller",
              "comment": "What are you talking about? That looks like it was deliberately damage. Also, how come only your shipping has issues when many of customers never had any???",
              "created_at": "09:22:10"
            }
          ]
        },
        {
          "id": "2",
          "title": "Dispute over Late Delivery of Custom Shoes",
          "description": "Buyer ordered custom-made shoes that arrived two weeks late. Seller claims delays were due to manufacturing issues.",
          "creator": "Buyer (Alice)",
          "is_archived": false,
          "created_at": "09:30:00",
          "comments": [
            {
              "id": "1",
              "creator": "Alice",
              "role": "buyer",
              "comment": "The shoes were supposed to arrive in 10 days, but I received them two weeks late. This is unacceptable!",
              "created_at": "09:31:00"
            },
            {
              "id": "2",
              "creator": "Bob's Custom Shoes",
              "role": "seller",
              "comment": "I apologize for the delay, but there were unforeseen issues with the manufacturer. Its beyond my control.",
              "created_at": "09:32:30"
            },
            {
              "id": "3",
              "creator": "Alice",
              "role": "buyer",
              "comment": "Then why didnt you inform me about the delay? I had no updates and no product for weeks.",
              "created_at": "09:34:00"
            },
            {
              "id": "4",
              "creator": "Bob's Custom Shoes",
              "role": "seller",
              "comment": "I was waiting for confirmation from the manufacturer. I shouldve updated you sooner. Can I offer you a discount?",
              "created_at": "09:36:00"
            },
            {
              "id": "5",
              "creator": "Bob's Custom Shoes",
              "role": "seller",
              "comment": "A discount??? I expect a full refund!",
              "created_at": "09:36:00"
            }
          ]
        },
        {
          "id": "3",
          "title": "Dispute over Dress Color",
          "description": "Buyer claims the dress color is completely different from what was advertised. Seller insists it's the correct color.",
          "creator": "Buyer (Sophia)",
          "is_archived": false,
          "created_at": "10:05:00",
          "comments": [
            {
              "id": "1",
              "creator": "Sophia",
              "role": "buyer",
              "comment": "The dress I received is blue, but the picture clearly shows a green dress. This is false advertising.",
              "created_at": "10:06:00"
            },
            {
              "id": "2",
              "creator": "TrendOutfit",
              "role": "seller",
              "comment": "The color may look slightly different due to lighting in the pictures, but its definitely the same item.",
              "created_at": "10:07:00"
            },
            {
              "id": "3",
              "creator": "Sophia",
              "role": "buyer",
              "comment": "It's not a slight difference. It's a completely different color! I want a refund or exchange.",
              "created_at": "10:08:30"
            },
            {
              "id": "4",
              "creator": "TrendOutfit",
              "role": "seller",
              "comment": "Im very sure the we sent the correct one. Send me a photo and i will take a look. ",
              "created_at": "10:09:45"
            }
          ]
        },
        {
          "id": "4",
          "title": "Dispute over Denied Access to an Online Course",
          "description": "Buyer purchased an online course but was never granted access. Seller says the course is no longer available.",
          "creator": "Buyer (Liam)",
          "is_archived": false,
          "created_at": "10:45:00",
          "comments": [
            {
              "id": "1",
              "creator": "Liam",
              "role": "buyer",
              "comment": "I paid for the online course, but I can't access it. What's going on?",
              "created_at": "10:46:00"
            },
            {
              "id": "2",
              "creator": "EduTech",
              "role": "seller",
              "comment": "The course was discontinued last week. We’ve sent a notification about this.",
              "created_at": "10:47:15"
            },
            {
              "id": "3",
              "creator": "Liam",
              "role": "buyer",
              "comment": "I didnt receive any notification. I want a full refund or access to an alternative course.",
              "created_at": "10:48:30"
            },
            {
              "id": "4",
              "creator": "EduTech",
              "role": "seller",
              "comment": "We can offer a refund or a coupon for another course. Please let us know what you'd prefer.",
              "created_at": "10:50:00"
            }
          ]
        },
        {
          "id": "5",
          "title": "Dispute over Damaged Laptop",
          "description": "Buyer received a laptop with a cracked screen. Seller claims the damage occurred during shipping.",
          "creator": "Buyer (Michael)",
          "is_archived": false,
          "created_at": "11:10:00",
          "comments": [
            {
              "id": "1",
              "creator": "Buyer (Michael)",
              "role": "buyer",
              "comment": "The laptop arrived with a cracked screen. I demand a replacement or a refund.",
              "created_at": "11:11:00"
            },
            {
              "id": "2",
              "creator": "Seller (TechWorld)",
              "role": "seller",
              "comment": "The laptop was inspected before shipping. The damage must have happened during transit.",
              "created_at": "11:12:30"
            },
            {
              "id": "3",
              "creator": "Buyer (Michael)",
              "role": "buyer",
              "comment": "That’s not my responsibility. The product should arrive in perfect condition.",
              "created_at": "11:14:00"
            },
            {
              "id": "4",
              "creator": "Seller (TechWorld)",
              "role": "seller",
              "comment": "We'll file a claim with the shipping company and work out a solution for you.",
              "created_at": "11:15:30"
            }
          ]
        },
        {
          "id": "6",
          "title": "Dispute over Web Design Service",
          "description": "Buyer claims that the delivered web design doesn't meet the agreed-upon specifications. Seller insists the work is satisfactory.",
          "creator": "Buyer (Lucas)",
          "is_archived": false,
          "created_at": "11:30:00",
          "comments": [
            {
              "id": "1",
              "creator": "Buyer (Lucas)",
              "role": "buyer",
              "comment": "The web design you delivered is far from what we agreed on. Its not responsive and looks outdated.",
              "created_at": "11:31:00"
            },
            {
              "id": "2",
              "creator": "Seller (DesignPros)",
              "role": "seller",
              "comment": "The design follows the guidelines we discussed. Its responsive and built according to modern standards.",
              "created_at": "11:32:30"
            },
            {
              "id": "3",
              "creator": "Buyer (Lucas)",
              "role": "buyer",
              "comment": "Its definitely not what I expected. I need revisions or a refund.",
              "created_at": "11:34:00"
            },
            {
              "id": "4",
              "creator": "Seller (DesignPros)",
              "role": "seller",
              "comment": "We can offer minor revisions, but we can't completely redo the design without additional charges.",
              "created_at": "11:35:30"
            }
          ]
        },
        {
          "id": "7",
          "title": "Case on who should be liable for the damage done for this lawnmover",
          "description": "Lawn mover seems to be defected. Seller seems to be blame the buyer for damaging it as it looks like it was delibrately and recently done",
          "creator": "Buyer (Lucas)",
          "is_archived": false,
          "created_at": "11:30:00",
          "comments": [
            {
              "id": "1",
              "creator": "Buyer (Lucas)",
              "role": "buyer",
              "comment": "The web design you delivered is far from what we agreed on. Its not responsive and looks outdated.",
              "created_at": "11:31:00"
            },
            {
              "id": "2",
              "creator": "Seller (DesignPros)",
              "role": "seller",
              "comment": "The design follows the guidelines we discussed. Its responsive and built according to modern standards.",
              "created_at": "11:32:30"
            },
            {
              "id": "3",
              "creator": "Buyer (Lucas)",
              "role": "buyer",
              "comment": "Its definitely not what I expected. I need revisions or a refund.",
              "created_at": "11:34:00"
            },
            {
              "id": "4",
              "creator": "Seller (DesignPros)",
              "role": "seller",
              "comment": "We can offer minor revisions, but we can't completely redo the design without additional charges.",
              "created_at": "11:35:30"
            }
          ]
        },
        {
          "id": "8",
          "title": "Dispute over Broken Subscription Cancellation Link",
          "description": "Buyer claims that they were unable to cancel their subscription due to a broken link on the seller's website and were charged for an additional month. Seller argues that the link was functional and the buyer didn't follow the cancellation process correctly.",
          "creator": "Buyer (Lucas)",
          "is_archived": false,
          "created_at": "11:30:00",
          "comments": [
            {
              "id": "1",
              "creator": "Buyer (Lucas)",
              "role": "buyer",
              "comment": "The web design you delivered is far from what we agreed on. Its not responsive and looks outdated.",
              "created_at": "11:31:00"
            },
            {
              "id": "2",
              "creator": "Seller (DesignPros)",
              "role": "seller",
              "comment": "The design follows the guidelines we discussed. Its responsive and built according to modern standards.",
              "created_at": "11:32:30"
            },
            {
              "id": "3",
              "creator": "Buyer (Lucas)",
              "role": "buyer",
              "comment": "Its definitely not what I expected. I need revisions or a refund.",
              "created_at": "11:34:00"
            },
            {
              "id": "4",
              "creator": "Seller (DesignPros)",
              "role": "seller",
              "comment": "We can offer minor revisions, but we can't completely redo the design without additional charges.",
              "created_at": "11:35:30"
            }
          ]
        },
        {
          "id": "9",
          "title": "Dispute over Unauthorized NFT Transfer",
          "description": "Buyer claims that an NFT they purchased was transferred to another account without their authorization. Seller insists they transferred it to the wallet address provided by the buyer and cannot reverse the transaction.",
          "creator": "Buyer (Lucas)",
          "is_archived": false,
          "created_at": "11:30:00",
          "comments": [
            {
              "id": "1",
              "creator": "Buyer (Lucas)",
              "role": "buyer",
              "comment": "The web design you delivered is far from what we agreed on. Its not responsive and looks outdated.",
              "created_at": "11:31:00"
            },
            {
              "id": "2",
              "creator": "Seller (DesignPros)",
              "role": "seller",
              "comment": "The design follows the guidelines we discussed. Its responsive and built according to modern standards.",
              "created_at": "11:32:30"
            },
            {
              "id": "3",
              "creator": "Buyer (Lucas)",
              "role": "buyer",
              "comment": "Its definitely not what I expected. I need revisions or a refund.",
              "created_at": "11:34:00"
            },
            {
              "id": "4",
              "creator": "Seller (DesignPros)",
              "role": "seller",
              "comment": "We can offer minor revisions, but we can't completely redo the design without additional charges.",
              "created_at": "11:35:30"
            }
          ]
        },
        {
          "id": "10",
          "title": "Dispute over Incomplete Freelance Work",
          "description": "Buyer hired a freelancer to complete a website design, but claims only 70% of the work was done. Seller states that the remaining work was out of scope based on their agreement, and any additional work requires extra payment.",
          "creator": "Buyer (Lucas)",
          "is_archived": false,
          "created_at": "11:30:00",
          "comments": [
            {
              "id": "1",
              "creator": "Buyer (Lucas)",
              "role": "buyer",
              "comment": "The web design you delivered is far from what we agreed on. Its not responsive and looks outdated.",
              "created_at": "11:31:00"
            },
            {
              "id": "2",
              "creator": "Seller (DesignPros)",
              "role": "seller",
              "comment": "The design follows the guidelines we discussed. Its responsive and built according to modern standards.",
              "created_at": "11:32:30"
            },
            {
              "id": "3",
              "creator": "Buyer (Lucas)",
              "role": "buyer",
              "comment": "Its definitely not what I expected. I need revisions or a refund.",
              "created_at": "11:34:00"
            },
            {
              "id": "4",
              "creator": "Seller (DesignPros)",
              "role": "seller",
              "comment": "We can offer minor revisions, but we can't completely redo the design without additional charges.",
              "created_at": "11:35:30"
            }
          ]
        },          
      ]
  })
  
})

export default app
