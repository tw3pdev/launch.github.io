const Twep = () => (
    <img src="/images/items/twep.png" style={{ height: '30px' }}></img>
  )
  
  const Eng = () => (
    <img src="/images/items/enUS.png" style={{ borderRadius: '5px' }}></img>
  )
  
  const Soon = () => (
    <span className="soon">Soon</span>
  )
  
  const VRocket = () => {
    let theme
    if (typeof window !== 'undefined') {
      theme = localStorage.getItem('toggleTheme')
    }
    if (theme == '"light-theme"') {
      return (
        <img src="/images/Fa/welaunch-light.svg" style={{ width: '20px' }}></img>
      )
    } else {
      return (
        <img src="/images/Fa/welaunch-dark.svg" style={{ width: '20px' }}></img>
      )
  
    }
  }

  const Menu = () => {
    let theme
    if (typeof window !== 'undefined') {
      theme = localStorage.getItem('toggleTheme')
    }
    if (theme == '"light-theme"') {
      return (
        <img src="/images/Fa/Menu.svg" style={{ width: '20px' }}></img>
      )
    } else {
      return (
        <img src="/images/Fa/Menu.svg" style={{ width: '20px' }}></img>
      )
  
    }
  }

  const Close = () => {
    let theme
    if (typeof window !== 'undefined') {
      theme = localStorage.getItem('toggleTheme')
    }
    if (theme == '"light-theme"') {
      return (
        <img src="/images/Fa/X.svg" style={{ width: '20px' }}></img>
      )
    } else {
      return (
        <img src="/images/Fa/X.svg" style={{ width: '20px' }}></img>
      )
  
    }
  }
  
  const VCompas = () => {
    let theme
    if (typeof window !== 'undefined') {
      theme = localStorage.getItem('toggleTheme')
    }
    if (theme == '"light-theme"') {
      return (
        <img src="/images/Fa/compas-light.svg" style={{ borderRadius: '15px', width: '20px' }}></img>
      )
    } else {
      return (
        <img src="/images/Fa/compas.svg" style={{ borderRadius: '15px', width: '20px' }}></img>
      )
    }
  }
  
  const VRank = () => {
    let theme
    if (typeof window !== 'undefined') {
      theme = localStorage.getItem('toggleTheme')
    }
    if (theme == '"light-theme"') {
      return (
        <img src="/images/Fa/rank-light.svg" style={{ width: '20px' }}></img>
      )
    } else {
      return (
        <img src="/images/Fa/rank.svg" style={{ width: '20px' }}></img>
      )
    }
  }
  
  const VAntibot = () => {
    let theme
    if (typeof window !== 'undefined') {
      theme = localStorage.getItem('toggleTheme')
    }
    if (theme == '"light-theme"') {
      return (
        <img src="/images/Fa/antibot-light.svg" style={{ width: '20px' }}></img>
      )
    } else {
      return (
        <img src="/images/Fa/antibot.svg" style={{ width: '20px' }}></img>
      )
    }
  }

  const Upvote = () => {
    let theme
    if (typeof window !== 'undefined') {
      theme = localStorage.getItem('toggleTheme')
    }
    if (theme == '"light-theme"') {
      return (
        <img src="/images/Fa/upvote.svg" style={{ width: '15px' }}></img>
      )
    } else {
      return (
        <img src="/images/Fa/upvote.svg" style={{ width: '15px' }} ></img>
      )
    }
  }

  const Downvote = () => {
    let theme
    if (typeof window !== 'undefined') {
      theme = localStorage.getItem('toggleTheme')
    }
    if (theme == '"light-theme"') {
      return (
        <img src="/images/Fa/downvote.svg" style={{ width: '15px' }}></img>
      )
    } else {
      return (
        <img src="/images/Fa/downvote.svg" style={{ width: '15px' }} ></img>
      )
    }
  }
  
  const VPlane = () => {
    let theme
    if (typeof window !== 'undefined') {
      theme = localStorage.getItem('toggleTheme')
    }
    if (theme == '"light-theme"') {
      return (
        <img src="/images/Fa/plane-light.svg" style={{ width: '20px' }}></img>
      )
    } else {
      return (
        <img src="/images/Fa/plane.svg" style={{ width: '20px' }}></img>
      )
    }
  }

    
  const Message = () => {
    let theme
    if (typeof window !== 'undefined') {
      theme = localStorage.getItem('toggleTheme')
    }
    if (theme == '"light-theme"') {
      return (
        <img src="/images/Fa/message.svg" style={{ width: '15px' }}></img>
      )
    } else {
      return (
        <img src="/images/Fa/message.svg" style={{ width: '15px' }}></img>
      )
    }
  }

  const Report = () => {
    let theme
    if (typeof window !== 'undefined') {
      theme = localStorage.getItem('toggleTheme')
    }
    if (theme == '"light-theme"') {
      return (
        <img src="/images/Fa/report.svg" style={{ width: '15px' }}></img>
      )
    } else {
      return (
        <img src="/images/Fa/report.svg" style={{ width: '15px' }}></img>
      )
    }
  }

  const Send = () => {
    let theme
    if (typeof window !== 'undefined') {
      theme = localStorage.getItem('toggleTheme')
    }
    if (theme == '"light-theme"') {
      return (
        <img src="/images/Fa/send.svg" style={{ width: '15px' }}></img>
      )
    } else {
      return (
        <img src="/images/Fa/send.svg" style={{ width: '15px' }}></img>
      )
    }
  }

  export { Twep,Upvote, Report, Eng, Message, Downvote, Soon, Send, VRocket, VCompas, VRank, VAntibot, VPlane, Menu, Close }