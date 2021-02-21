const BASE_URL = "https://madeof.herokuapp.com"
const HOROSCOPES_URL = `${BASE_URL}/horoscopes`
const DAILY_URL = `${BASE_URL}/dailies`

        
window.addEventListener( "load", function () {

  class Sign {
    constructor(signId, signAttributes) {
      this.signId = signId;
      this.name = signAttributes.name;
      this.startDate = signAttributes.start_date;
      this.endDate = signAttributes.end_date;
      this.symbol = signAttributes.symbol;
      this.house = signAttributes.house;
      this.planet = signAttributes.planet;
      this.element = signAttributes.element;
      this.quality = signAttributes.quality;
      this.polarity = signAttributes.polarity;

      buildAll(signAttributes, signId)
    }


    createLists(){
      
      let list = document.createElement('div')
    
      let summary = document.createElement('summary')
      summary.innerText = this.name
      list.appendChild(summary)

    
      this.signId.prepend(list)
    
      let dates = document.createElement('h4')
      dates.innerHTML = `${this.startDate} - ${this.endDate}`
    
      let symbol = document.createElement('li')
      symbol.innerText =  `Symbol: ${this.symbol}`
    
      let house = document.createElement('li')
      house.innerText = `House: ${this.house}`
    
      let planet = document.createElement('li')
      planet.innerText = `Ruling planet: ${this.planet}`
    
      let element = document.createElement('li')
      element.innerText = `Element: ${this.element}`
    
      let quality = document.createElement('li')
      quality.innerText = `Quality: ${this.quality}`
    
      let polarity = document.createElement('li')
      polarity.innerText = `Polarity: ${this.polarity}`
    
      list.appendChild(dates)
      list.appendChild(symbol)
      list.appendChild(house)
      list.appendChild(planet)
      list.appendChild(element)
      list.appendChild(quality)
      list.appendChild(polarity)
    }
  
    
    
  }

let today = new Date();
let date = (today.getFullYear()+ '-' + (today.getMonth()+1) + '-' + today.getDate());


fetch(HOROSCOPES_URL)
  .then(function(response) {
      return response.json();
  })
  .then(function(json){
      setUpHoroscopes(json)      
  });

function setUpHoroscopes (arr){
  arr.forEach(signData => {

    s = document.getElementsByClassName('sign')
    
    for (const imgSrc of s){

        if (signData.name.toLowerCase() == imgSrc.alt){  

          let signId = document.getElementById(`${imgSrc.alt}`)

          let sign = new Sign(signId, signData)
          sign.createLists()
        }
    }
    
   
  })
}


function buildAll (signData, signId){
             createHouse(signData, signId)
             createElement(signData, signId)
             createQuality(signData, signId)
             createPolarity(signData, signId)
             addDaily(signData, signId)
}

// add event listener to img that shows/hides sign information



  let s = document.getElementsByClassName('sign')

  for (const img of s){
    img.addEventListener('click', function(){
    
      let signId = document.getElementById(`${img.alt}`)

      if (signId.style.display === "" || signId.style.display === "none"){
        signId.style.display = "inline-block"
      }
      else if (signId.style.display === "inline-block"){
        signId.style.display = "none"
      }
    })
  } 





// building lists
// function createLists(signData, signId){
//   let list = document.createElement('div')

//   let summary = document.createElement('summary')
//   summary.innerText = signData.name
//   list.appendChild(summary)

//   signId.appendChild(list)

//   let dates = document.createElement('h4')
//   dates.innerHTML = `${signData.start_date} - ${signData.end_date}`

//   let symbol = document.createElement('li')
//   symbol.innerText =  `Symbol: ${signData.symbol}`

//   let house = document.createElement('li')
//   house.innerText = `House: ${signData.house}`

//   let planet = document.createElement('li')
//   planet.innerText = `Ruling planet: ${signData.planet}`

//   let element = document.createElement('li')
//   element.innerText = `Element: ${signData.element}`

//   let quality = document.createElement('li')
//   quality.innerText = `Quality: ${signData.quality}`

//   let polarity = document.createElement('li')
//   polarity.innerText = `Polarity: ${signData.polarity}`

//   list.appendChild(dates)
//   list.appendChild(symbol)
//   list.appendChild(house)
//   list.appendChild(planet)
//   list.appendChild(element)
//   list.appendChild(quality)
//   list.appendChild(polarity)
// }

//creating daily


function addDaily(signData, signId){
  
  let divider = document.createElement('div')
  let divHdr = document.createElement('h4')
  divHdr.innerText = `Daily Readings for ${date}`
  divider.className = "daily"
  let infoList = document.createElement('ul')
  let viewBtn = document.createElement('button')
  viewBtn.className = "viewOtherDailies"
  viewBtn.innerText = "View previous daily readings" 
  let viewDailiesByMonth = document.createElement('button') 
  viewDailiesByMonth.innerText = "View Readings by Month"   

  signId.appendChild(divider)
  divider.appendChild(divHdr)
  divHdr.appendChild(infoList)


  let dailyButton = document.createElement('button')
  dailyButton.innerText = "Add Daily Reading"
  dailyButton.className = 'addDaily'
  let brk = document.createElement('br')

  let form = createForm(signData)

  
  divider.appendChild(dailyButton)
  divider.appendChild(brk)
  divider.appendChild(viewBtn)
  divider.appendChild(form)
  divider.appendChild(viewDailiesByMonth)

  let moreDailiesDiv = document.createElement('div')
  moreDailiesDiv.id = "prevDailies"
  let dailyList = document.createElement('ul')
  divider.appendChild(moreDailiesDiv)
  moreDailiesDiv.appendChild(dailyList)
  
    let dailies = signData.dailies
  
    if (dailies.length > 0){  //shows current/Today's list
  
      for (const daily of dailies){
        let d = daily.date.split("-")
        if (today.getFullYear() == d[0] && (today.getMonth()+1) == d[1] && today.getDate() == d[2]){
          let info = document.createElement('li')        
          info.innerText =  `Source: ${daily.source}\n` + `Reading: ${daily.text}\n` 
          info.id = `daily/${daily.id}`
          infoList.appendChild(info)
        }

        else if (date != daily.date){
          let chkVlu = document.getElementById(`${daily.date}/${daily.horoscope_id}`)
        
          if (chkVlu == null){
            let dateHdr = document.createElement('h4')
            dateHdr.innerText = daily.date
            let dateContainer = document.createElement('ul')
            dateContainer.id = `${daily.date}/${daily.horoscope_id}`
            let dailyInfo = document.createElement('li')
            
            dailyInfo.innerText = `Source: ${daily.source}\n` + `Reading: ${daily.text}\n`

            dailyList.appendChild(dateHdr)
            dateHdr.appendChild(dateContainer)
            dateContainer.appendChild(dailyInfo)
          }
      

          else if (chkVlu){

            let dailyInfo = document.createElement('li')
            dailyInfo.innerText = `Source: ${daily.source}\n` + `Reading: ${daily.text}\n`
            
            chkVlu.appendChild(dailyInfo)
            
          }

        }
      }
    }
        


  viewBtn.addEventListener("click", function(){
    if (moreDailiesDiv.style.display == "" || moreDailiesDiv.style.display == "none"){
      moreDailiesDiv.style.display = "inline-block"
      viewBtn.innerText = "Close previous daily readings"
    }
    else if (moreDailiesDiv.style.display == "inline-block"){
      moreDailiesDiv.style.display = "none"
      viewBtn.innerText = "View previous daily readings"
    }

  })

  dailyButton.addEventListener('click', function(){
    if (form.style.display === 'none' || form.style.display === ""){
      form.style.display = "block"
      dailyButton.innerText = "Close Daily form"
    }
    else if (form.style.display === 'block'){
      form.style.display = 'none'
      dailyButton.innerText = "Add Daily Reading"
    }
  })

  form.onsubmit = function sendInfo (){ 
    event.preventDefault()

    let dateReceived = `${date}`                     
    let sourceReceived = form.elements[0].value 
    let readingReceived = form.elements[1].value
    let horoscope_id = form.id 

    let formData = {
      dateReceived: dateReceived,
      sourceReceived: sourceReceived,
      readingReceived: readingReceived,
      horoscope_id: horoscope_id
    };

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch(DAILY_URL, options);

    let brkdwnDate = dateReceived.split("-")

    if (today.getFullYear() == brkdwnDate[0] && (today.getMonth()+1) == brkdwnDate[1] && today.getDate() == brkdwnDate[2]){
          let ind = document.createElement('li')
          ind.innerText = `Source: ${sourceReceived}\n` + `Reading: ${readingReceived}`
          infoList.appendChild(ind)

    form.reset()
    }
  }
}
   

function createForm(signData){
  let form = document.createElement('form')
  form.id = signData.id
  form.className = "dailyForm" 

  let lineBreak = document.createElement('br')
  let lineBreak2 = document.createElement('br')
  let lineBreak3 = document.createElement('br')  

  let sourceInput = document.createElement('input')
  sourceInput.setAttribute('type', 'text')
  sourceInput.setAttribute('placeholder', 'Source')



  let readingInput = document.createElement('textarea')
  readingInput.placeholder = "Reading"
  readingInput.rows = "10"
  readingInput.cols ="50"
  

  let submit = document.createElement('button')
  submit.id = "submit"
  submit.innerText = "Submit"
  submit.setAttribute('type', 'submit')
  submit.setAttribute('value', 'Submit')

  form.appendChild(lineBreak)
  form.appendChild(sourceInput)
  form.appendChild(lineBreak2)
  form.appendChild(readingInput)
  form.appendChild(lineBreak3)
  form.appendChild(submit)

  return form 
}




//creating house
function createHouse(signData, signId){
  let lowerCaseName = signData.name.toLowerCase()
  let sec = document.getElementById(`${lowerCaseName}`)
  let houseInfo = document.createElement('div')


  let hdr = document.createElement('h4')
  hdr.innerText = "The houses are WHERE these energies are most likely to manifest. The houses are the fields of experience, not the experience themselves..."
  let p = document.createElement('p')
  p.innerText = getHouse(signData.house)

  houseInfo.appendChild(hdr)
  houseInfo.appendChild(p)
  signId.appendChild(houseInfo)
}

// creating element
function createElement(signData, signId){
  let elementDiv = document.createElement('div')
  let elementHdr = document.createElement('h4')
  elementHdr.innerText = "The element of a zodiac sign reveals the basic temperament of the sign..."
  let elementP = document.createElement('p')
  elementP.innerText = getElement(signData.element)

  signId.appendChild(elementDiv)
  elementDiv.appendChild(elementHdr)
  elementDiv.appendChild(elementP)
}

  // creating qualities
function createQuality(signData, signId){
  let qualityDiv = document.createElement('div')
  let qualityHdr = document.createElement('h4')
  qualityHdr.innerText = "The qualities, also called 'modes', or 'modalities', indicate how people respond to stimuli, and especially how they act under tension..."
  let qualityP = document.createElement('p')
  qualityP.innerText = getQuality(signData.quality)

  signId.appendChild(qualityDiv)
  qualityDiv.appendChild(qualityHdr)
  qualityDiv.appendChild(qualityP)
}


// polarities
function createPolarity(signData, signId){
  let polarityDiv = document.createElement('div')
  let polarityHdr = document.createElement('h4')
  polarityHdr.innerText = "The thing about your Polarity is..."
  let polarityP = document.createElement('p')
  polarityP.innerText = "The two polarities are sometimes referred to as male/female, positive/negative, or yang/yin. Modern astrologers prefer to call the polarities active/receptive. This type of duality is the earliest form of classification. Yang energy is also known as 'masculine' energy. These are the Fire and Air signs. These signs are more active and assertive rather than receptive. Yin energy is also known as 'feminine' energy. These are the Earth and Water signs. These signs are more receptive and reactive rather than active. In general, signs of the same polarity can understand each other's personalities, whereas signs from opposing polarities have a difficult time seeing eye to eye. Air feeds Fire and empowers it; Earth needs Water for life. When talking about compatibility, Air and Fire signs (yang) go with each other, while Earth and Water signs (yin) go with each other."

  signId.appendChild(polarityDiv)
  polarityDiv.appendChild(polarityHdr)
  polarityDiv.appendChild(polarityP)
}


function getHouse(house){
  
   switch(house) {
    case '1st':
      return "The first House is the House of self. This includes self-awareness, the physical body, personality, appearance, personal views on life, self-identity, self-image, early environment, and beginnings; how we initiate, how we're impulsive. Any planets in this house will greatly influence your personality and how others perceive you."
      break;
    case '2nd':
      return "The second House refers to your own money and possessions, what you value, your hidden talents, sense of self-worth, self-esteem (how you value yourself, instead of describing your personality as in the 1st House). Possessions include anything a person owns (except the house/home which is ruled by the 4th House): cars, furniture, clothing, moveable property, investments and securities, etc. The 2nd house specifies how you gain and spend your own money (as opposed to other's money in the 8th house), your attitude towards wealth and material possessions, and your potential for accumulating it/them."
      break;
    case '3rd':
      return "The third House is that of communication, which by extension includes one's immediate environment: siblings, neighbors, short journeys, and all forms of transportation. The 3rd house also includes the intellect, the lower mind (details and small bits of information as opposed to the higher mind in 9th house), thinking patterns, and early education (before college). Communication includes messages, deliveries, gossip, phone calls, visits, reading and writing."
      break;
    case '4th':
      return "The fourth House refers to the home and everything associated with it (both the childhood home & the current home): family, land, personal foundations (inner emotional security), your roots. Astrologers are divided over whether this house is associated with one's mother or father. What is clear is that a person's upbringing is associated with this House.On a deeper level, the 4th house is the base of consciousness or the center of our concrete existence. See how the cusp of the 4th house is the I.C., the lowest point on the chart, representative of things below the surface of Earth. Due to that, the 4th house was believed to rule the conditions at the end of life, and graves. As the root or base of your real self, the 4th house rules where you go when you 'die' but also where you came from. For those who believe in reincarnation, the 4th house would give clues to your karmic lesson for this lifetime. It shows what karmic baggage you brought with you into this life. Even if you don't believe in reincarnation, you're likely to be surprised by what you find in your 4th house for it may move your soul. Any planets in the 4th house affect your home life, your emotions, your subconscious, and possibly your relationship with your parents."
      break;
    case '5th':
      return "The fifth House refers to children, creativity, and the pursuit of pleasure. This includes personal interests, love affairs, sports, hobbies, speculation, risk-taking, teaching, drama, creative self-expression, love given, gambling. The 5th house is all about you being yourself and enjoying it. Romance, dating, love affairs, and sexual relationships are ruled by this 5th house, yet marriage is assigned to the 7th. Why? Because, until very recently, marriage was not entered into for pleasure, for love, nor for personal fulfillment. Marriage was hardly even entered into by choice, but rather for the purpose of raising kids to preserve the values of a particular culture or religion. And these marriages were most often arranged according to class and financial status, a partnership befitting the 7th house. Nowadays, it's common to marry for love. To avoid confusion, remember: affairs of the heart are in the 5th house, but cooperative partnerships are in the domain of the 7th house."
      break;
    case '6th':
      return "The sixth House refers to daily work, service, diet, health and physical sickness, physical ability to work, employees. This includes volunteer labor, civil service work, caretaking, and mundane daily tasks. The 6th house really involves the quality of your work, the quality of the jobs you perform, as opposed to an actual career (career is represented by the 10th house). Daily mundane tasks include personal hygiene and our method of responding to everyday crises."
      break;  
    case '7th':
      return "The seventh House is sometimes referred to as the House of marriage, but it encompasses all one-to-one relationships: marriage, business partnerships, contracts, cooperative relationships, and also divorce, separation, quarrels, open enemies, and law suits. The difference between the love affairs of the 5th House and love relationships of the 7th is that the 7th House refers to more permanently binding relationships, whereas the 5th House refers to affairs that may be temporary. When the 5th House affair progresses into a serious relationship, we can say that the relationship has 'moved into the 7th House'. 7th house relationships are about cooperation and sharing, and they generally serve some functional purpose in the larger social community (i.e. a marriage). This is different from a 5th house love affair, whose only qualification is 'butterflies in the stomach'. The 7th house includes the way you relate to those closest to you. Planets in this house will influence your manner of relating. They also give clues to issues that arise in your relationships."
      break;
    case '8th':
      return "Simply put, the 8th house is the polar opposite of the 2nd house. Whereas the 2nd rules your own individual possessions, the 8th house rules what a relationship owns (joint finances). The 8th House is one of the most misunderstood Houses. This is probably because the things represented by the 8th House seem to have nothing in common with each other, or they seem to be negative. This House governs death, regeneration, taxes, inheritances, wills & legacies, sex (the actual act of sex), latent occult ability, joint resources, your partner’s money and possessions, spouse's money, bankruptcy, losses, personal sacrifices, alimony, clairvoyance. On a positive note, this House is about transformation and healing. But transformation and healing require some type of death, loss, or injury first. This House rules those processes and things by which we transform and become more powerful. Yes, this includes the act of sex."
      break;
    case '9th':
      return "The ninth House refers to philosophy, religion, law, learning, higher education (as opposed to early education by the 3rd House), ethics, morals, long journeys, travel, foreign countries and interests, spiritual urges, dreams, visions, higher mind, ideas, understanding and wisdom, books, publishing, ceremonies, and rituals. This is the House of big thoughts and big ideas. 9th house 'understanding' is more complex than 3rd house 'knowledge'. The act of 'knowing' belongs to the 3rd house because it implies simply the direct contact of a person with something in his environment. Understanding involves the synthesis of known data. While the 3rd house refers to an individual's need to understand his close and personal environment, the 9th house is an area in which one seeks to discover the significance of larger fields of social existence which one may not experience directly but which his mind may explore through the use of analogy, generalization and abstraction. The 3rd and 9th houses symbolize the 2 polarities of the human mind, the concrete and the abstract. In summary, the 9th house includes experiences that we encounter when we search for the meaning of things. Whatever expands your field of activity or the scope of your mind, long journeys, contact with other cultures, great dreams, and even experiences with fortunetellers."
      break;
    case '10th':
      return "The tenth House is the House of status, honor, community power, prestige, reputation, and professional career. In our society, this includes financial success, but only as it relates to community power and prestige. It's not about gaining 'material stuff' as it is in the 2nd house. The 10th house wants success for the sake of honor and social status. This house includes social foundations (as opposed to personal home foundations in the 4th), recognition, personal achievements, social responsibilities, sense of duty, authority figures, politicians. This House encompasses the most public areas of one's life, and the career that you grow into, as opposed to daily work and odd jobs ruled by the 6th House. As with the 4th House, astrologers are divided over whether the 10th House rules one's mother or father. Those that say the 4th House rules the mother, say the 10th House rules the father, and vice versa. What is clear is that the 4th House rules the nurturing, home-body parent, while the 10th House rules the public, success-focused parent (the parent who 'wears the pants'). As with the other angular houses, any planets in this house are very important. Planets in the 10th house, the sign on the cusp of the 10th house, and its ruling planet will greatly influence your career and your general reputation in public."
      break;
    case '11th':
      return "The eleventh House is the House of community, large groups, and friends. It refers to memberships, hopes, goals, ambitions, wishes, social groups, associations, humanitarian interests. It also refers to self-realization, liberty, legislation and regulation."
      break; 
    case '12th':
      return "This is probably the most misunderstood house of all. The twelfth House refers to the subconscious, the hidden self that exists apart from our physical everyday reality. This includes the unconscious mind, subconscious memory, subconscious habit patterns from the past, mental illness, karmic debts, self-deception, escapism, spiritual realization, limitations, frustration, and ultimately our self-undoing. On a physical, material level, the 12th house includes things that take us away from everyday life: institutions (such as hospitals, prisons, government offices), places of confinement, secrets, secret relationships, hidden enemies, and self-sacrifice for others. It also refers to sorrow, tribulations, widowhood, grief, funerals, exile, seclusion, bribery, subversion, murder, suicide, kidnapping, and endings.For those who believe, the 12th house is also considered to refer to the collective unconscious of all humanity."
      break;
  }
}



function getElement(element){
  switch(element){
    case 'Air':
      return "Air signs approach energy mentally; they are thinkers. They are social, always ready for a new relationship or friendship. They love learning, but bore easily. Gemini has great intellectual curiosity, but too many personalities. Libra is partnership driven, but not in an emotional way. Aquarius is popular with friends and is unstoppable when it has a cause to champion. Air signs are into ideas and people. They are communicative; they must share information, interact with others, and influence society."
      break;
    case 'Fire':
      return "Fire signs respond to energy very quickly. They favor action. They're ready to go, take a risk, start a business, go on a trip, etc. They are confident, idealistic, intense, and approach life with zest and enthusiasm. Here is energy to conquer, lead, and travel physically and mentally. Aries must act, Leo must lead grandly, and Sagittarius explores unknown places and ideas."
      break;
    case 'Earth':
      return "Earth signs are more cautious in their approach. They are more practical, realistic, and they need solid footing before going forward. Taurus will dig the heels in and really ponder things. Virgo will analyze. Capricorn will climb, but will do it with care, first needing a vision, a plan, an organized structure before starting the ascent. Earth signs are dependable, thorough and solid. Earth signs seek to engage the physical world and master it through efficient organization. Earth signs seek economic security, respect, and prestige, and they work hard for it."
      break; 
    case 'Water':
      return "Water signs respond to energy almost unconsciously. They are deeply emotional. Cancer is motivated to nurture and be nurtured. Scorpio has intense vision, never swaying, looking straight ahead with laser-like focus. Pisces is the trickiest to describe. Pisces energy is chameleon-like, absorbing its surroundings."
      break;
  }
}


function getQuality(quality){
  switch(quality){
    case 'Cardinal':
      return "Cardinal Signs are the most assertive, the most interested in initiating change. Their mode of activity is to start new things. They easily begin things and respond well to new ideas. They are self-starters. Crisis motivates them. They achieve control by remaining one step ahead of everyone else. Aries seeks leadership and control in general, Cancer controls emotions, home, and family; Libra tries to control partnerships; Capricorn controls, uses, and exploits the material environment. For Cardinal signs, things are always happening. This is usually because they are doing the starting. The four Cardinal signs are at the first month of each season."
      break;
    case 'Fixed':
      return "Fixed Signs are the most stable and self-contained. Their mode of activity is sort of passive, yet determined, unwavering, and even stubborn. Their strength is their consistency and loyalty. They follow things through to the end, managing and sustaining what has been started by the Cardinal signs. They may go to denial in times of change. They are very resistant to change, needing to take time to prep themselves. They tend to be late: Taurus is just slow; Scorpio uses tardiness as a subtle power struggle; Leo enjoys making an entrance; Aquarius wants things on their own terms. Late, but once there, they stay forever. The four Fixed signs are at the middle month of each season."
      break;
    case 'Mutable':
      return "Mutable Signs are the most unstable and most open to influence by the environment. Their mode of activity is to make the transition from the old to the new, opening the way for the Cardinal Signs to begin a new cycle. They are infinitely flexible and tolerant. They find it naturally easy to let go. Whereas Cardinal signs begin new things, and Fixed signs sustain things, Mutable energy loosens structures and adapts it to new and changing conditions. With this territory comes mental worry. Mutable signs have many things going on in their heads rather than in tangible form. Many react by making lists. Some suffer from negative mental tension, involving fear, paranoia, and panic attacks. In anticipating negative outcomes, they really suffer during the worry process. But their high adaptability always sees them through. Gemini is changeable in its ideas; Virgo is dominated by its environment; Sagittarius has a continually changing view of life's possibilities; Pisces adapts itself superficially to its environment (like a chameleon) and reflects it like a mirror. Sometimes they compromise so much that they sacrifice their own interests. The four Mutable signs are at the final month of each season."
      break;
  }
}



})








  
  // function removeReading (img, id){
  //   img.addEventListener('click', function(){
  //    let rd = document.getElementById(`daily/${id}`)
  //      rd.remove()
  //   })
  // }