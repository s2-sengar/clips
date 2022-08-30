import { Component, AfterContentInit , ContentChildren,QueryList} from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.scss']
})
export class TabsContainerComponent implements AfterContentInit {

  @ContentChildren(TabsComponent) tabs:QueryList<TabsComponent>=new QueryList();

  constructor() { }

  ngAfterContentInit(): void {
    const activeTab=this.tabs.filter(
      tab=>tab.active==true
    )
    
    if(!activeTab || activeTab.length===0){
      this.selectTab(this.tabs.first);
    }
  }
  selectTab(tab:TabsComponent){

    this.tabs.forEach(el=>el.active=false);
    tab.active=true;

    return false; // prevents default behavior
  }
  applyActiveClass(tab:TabsComponent){
    return {
      'hover:text-indigo-400':!tab.active,
      'hover:text-white text-white bg-indigo-400':tab.active
    }
  }
}
